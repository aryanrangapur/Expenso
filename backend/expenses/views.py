from django.shortcuts import render
from .models import Expense
from .serializers import ExpenseSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from collections import defaultdict
from calendar import month_name
from django.db.models.functions import TruncMonth, TruncWeek, TruncYear

# REMOVE OR COMMENT OUT the home view
# def home(request):
#     return render(request,'index.html')

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        user_expenses = self.get_queryset()

        # Yearly stats
        yearly_data = user_expenses.annotate(year=TruncYear('transaction_date')) \
            .values('year') \
            .annotate(total=Sum('amount')) \
            .order_by('year')
        yearly_totals = {str(entry['year'].year): entry['total'] for entry in yearly_data}

        # Monthly stats
        monthly_data = user_expenses.annotate(year=TruncYear('transaction_date'), month=TruncMonth('transaction_date')) \
            .values('year', 'month') \
            .annotate(total=Sum('amount')) \
            .order_by('year', 'month')

        monthly_totals_by_year = defaultdict(dict)
        for entry in monthly_data:
            year = str(entry['year'].year)
            month = month_name[entry['month'].month]
            monthly_totals_by_year[year][month] = entry['total']

        # Weekly stats
        weekly_totals_by_year = defaultdict(lambda: defaultdict(float))
        for exp in user_expenses:
            year = str(exp.transaction_date.year)
            month = month_name[exp.transaction_date.month]
            week_num = (exp.transaction_date.day - 1) // 7 + 1
            label = f"Week {week_num} of {month}"
            weekly_totals_by_year[year][label] += float(exp.amount)

        # Combine all stats by year
        final_data = {}
        for year in yearly_totals:
            final_data[year] = {
                'yearly': yearly_totals[year],
                'monthly': monthly_totals_by_year.get(year, {}),
                'weekly': weekly_totals_by_year.get(year, {})
            }

        return Response(final_data)
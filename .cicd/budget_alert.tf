resource "aws_budgets_budget" "ec2" {
    name = "budget-ec2-monthly"
    budget_type = "COST"
    limit_amount = 5
    limit_unit = "USD"
    time_unit = "MONTHLY"

    cost_filter {
        name = "Service"
        values = [
            "Amazon Elastic Compute Cloud - Compute",
        ]
    }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = var.notification_emails
  }
}
# Generated by Django 3.2.2 on 2021-05-15 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_auto_20210514_1513'),
    ]

    operations = [
        migrations.AddField(
            model_name='queue',
            name='time_added_to_queue',
            field=models.CharField(default=True, max_length=255),
        ),
    ]

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPostsByDayMonthService } from './user-posts-by-day-month.service';

@Component({
  selector: 'app-user-posts-by-day-month',
  templateUrl: './user-posts-by-day-month.component.html',
  styleUrls: ['./user-posts-by-day-month.component.css'],
})
export class UserPostsByDayMonthComponent implements OnInit {
  day!: number;
  month!: number;
  posts: any[] = [];
  error: any = null;

  displayedColumns: string[] = [
    'description',
    'location',
    'mood',
    'temperature',
    'photo',
    'date',
    'actions',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userPostsService: UserPostsByDayMonthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.day = +params['day'];
      this.month = +params['month'];
      this.getUserPostsByDayAndMonth();
    });
  }

  getUserPostsByDayAndMonth() {
    this.userPostsService
      .getUserPostsByDayAndMonth(this.month, this.day)
      .subscribe(
        (response) => {
          this.error = null;
          this.posts = response.data;
        },
        (err) => {
          this.posts = [];
          this.error = err.error.message;
        }
      );
  }

  navigateToPreviousDay() {
    if (this.day > 1) {
      this.day--;
    } else {
      // Navigate to previous month
      if (this.month > 1) {
        this.month--;
        this.day = this.getLastDayOfMonth(this.month);
      }
    }
    this.router.navigate(['/user/posts', this.month, this.day]);
  }

  navigateToNextDay() {
    const lastDayOfMonth = this.getLastDayOfMonth(this.month);

    if (this.day < lastDayOfMonth) {
      this.day++;
    } else {
      // Navigate to next month
      if (this.month < 12) {
        this.month++;
        this.day = 1;
      }
    }

    this.router.navigate(['/user/posts', this.month, this.day]);
  }

  private getLastDayOfMonth(month: number): number {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month];
  }
}

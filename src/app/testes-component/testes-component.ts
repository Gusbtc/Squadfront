import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-testes-component',
  standalone: true,
  imports: [],
  templateUrl: './testes-component.html',
  styleUrls: ['./testes-component.scss']
})
export class TestesComponent implements OnDestroy {
  toastVisible = false;
  toastHiding  = false;  

  private hideTimer: number | null = null;
  private removeTimer: number | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  showToast(): void {
    if (this.hideTimer)   { clearTimeout(this.hideTimer);   this.hideTimer = null; }
    if (this.removeTimer) { clearTimeout(this.removeTimer); this.removeTimer = null; }

    this.toastHiding = false;
    this.toastVisible = true;
    this.cdr.detectChanges();

    this.hideTimer = window.setTimeout(() => {
      this.toastHiding = true;              
      this.cdr.detectChanges();

      this.removeTimer = window.setTimeout(() => {
        this.toastVisible = false;
        this.toastHiding  = false;
        this.cdr.detectChanges();
        this.removeTimer = null;
      }, 280);
      this.hideTimer = null;
    }, 2200);
  }

  ngOnDestroy(): void {
    if (this.hideTimer)   clearTimeout(this.hideTimer);
    if (this.removeTimer) clearTimeout(this.removeTimer);
  }
}

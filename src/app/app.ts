import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, group, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({ position: 'absolute', left: 0, right: 0, top: 0 })
        ], { optional: true }),
        group([
          query(':leave', [
            style({ opacity: 1, transform: 'translateY(0)' }),
            animate('180ms ease', style({ opacity: 0, transform: 'translateY(8px)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(-8px)' }),
            animate('220ms 40ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  private routeOrder = [
    '/dashboard','/backend','/apis','/gateways','/testes',
    '/tags','/documentacao','/usuarios','/configuracao'
  ];

  activeIndex = 0;
  pillTop = 0;
  pillHeight = 0;
  isCollapsed = false;

  @ViewChildren('menuItem') menuItems!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChild('navRoot', { static: true }) navRoot!: ElementRef<HTMLElement>;

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      const found = this.routeOrder.findIndex(p => url.startsWith(p));
      if (found >= 0) this.activeIndex = found;
      this.repositionPill();
    });
  }

  ngAfterViewInit() { setTimeout(() => this.repositionPill()); }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed) setTimeout(() => this.repositionPill(), 0);
  }

  setActive(i: number) { this.activeIndex = i; this.repositionPill(); }
  onPress(i: number)   { this.menuItems.get(i)?.nativeElement.classList.add('pressed'); }
  onRelease(i: number) { this.menuItems.get(i)?.nativeElement.classList.remove('pressed'); }

  private repositionPill() {
    const el = this.menuItems.get(this.activeIndex)?.nativeElement;
    const first = this.menuItems.get(0)?.nativeElement;
    if (!el || !first) return;
    const baseTop = first.offsetTop;
    this.pillTop = (el.offsetTop - baseTop) + 4;
    this.pillHeight = el.offsetHeight;
  }

  onSaveRequest() {
    const toast = document.getElementById('toast-notification');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    } else {
      // fallback
      console.log('Salvo com sucesso!');
    }
  }
}

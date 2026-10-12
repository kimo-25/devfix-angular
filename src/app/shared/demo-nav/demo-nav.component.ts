import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../core/dc-base';

@Component({
  selector: 'app-demo-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './demo-nav.component.html',
  styleUrl: './demo-nav.component.css',
})
export class DemoNavComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { open: false }; }
  renderVals() {
    return { open: this.state.open, expanded: this.state.open ? 'true' : 'false', label: this.state.open ? 'إغلاق القائمة' : 'تصفّح الشاشات', themeLabel: this.themeSvc.theme() === 'dark' ? 'مظهر فاتح' : 'مظهر داكن', toggleTheme: () => this.themeSvc.toggle(), toggle: () => this.setState((s) => ({ open: !s.open })) };
  }
}

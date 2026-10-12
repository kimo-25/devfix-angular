import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { saved: false, on: [true, true, true, false] }; }
  renderVals() {
    const st = this.state;
    const labels = ['وصول عرض جديد على طلبي', 'دخول الطلب فترة الإنذار', 'تغيّر حالة الطلب', 'عروض وحوافز التوكنز'];
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      saved: st.saved, save: () => this.setState({ saved: true }),
      toggles: labels.map((l, i) => ({ label: l, cls: st.on[i] ? 'on' : '', pressed: st.on[i] ? 'true' : 'false', flip: () => this.setState((s) => ({ on: s.on.map((v, j) => (j === i ? !v : v)) })) }))
    };
  }
}

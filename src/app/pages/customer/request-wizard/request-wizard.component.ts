import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-request-wizard',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './request-wizard.component.html',
  styleUrl: './request-wizard.component.css',
})
export class RequestWizardComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { step: 1, device: 1, issue: 'شاشة مكسورة' }; }
  renderVals() {
    const st = this.state;
    const icons = { mobile: 'M8.5 2.5h7a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2zM11 18.5h2', tablet: 'M6.5 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 17.5h2', laptop: 'M5 6h14a1 1 0 0 1 1 1v9H4V7a1 1 0 0 1 1-1zM2 19h20' };
    const devs = [
      { id: 1, type: 'mobile', name: 'iPhone 13', sub: 'موبايل · Apple', def: true },
      { id: 2, type: 'laptop', name: 'Dell XPS 13', sub: 'لابتوب · Dell', def: false },
      { id: 3, type: 'tablet', name: 'Galaxy Tab S8', sub: 'تابلت · Samsung', def: false }
    ];
    const cur = devs.find((d) => d.id === st.device);
    const issueSets = { mobile: ['شاشة مكسورة', 'بطارية', 'لا يشحن', 'الكاميرا', 'ماء أو رطوبة', 'برمجيات'], laptop: ['لا يعمل', 'سخونة زائدة', 'الشاشة', 'لوحة المفاتيح', 'اللوحة الأم', 'برمجيات'], tablet: ['اللمس لا يستجيب', 'شاشة مكسورة', 'بطارية', 'منفذ الشحن', 'بطيء', 'برمجيات'] };
    const labels = ['الجهاز', 'قسم العطل', 'الوصف والصور'];
    const step = st.step;
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      stepper: labels.map((l, i) => ({ n: String(i + 1).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]), label: l, cls: step > i + 1 ? 'done' : step === i + 1 ? 'on' : '', color: step >= i + 1 ? 'var(--ink)' : 'var(--muted)' })),
      s1: step === 1, s2: step === 2, s3: step === 3, s4: step === 4, showNav: step < 4,
      devices: devs.map((d) => ({ name: d.name, sub: d.sub, icon: icons[d.type], badge: d.def ? 'افتراضي' : '', cls: st.device === d.id ? 'on' : '', pressed: st.device === d.id ? 'true' : 'false', pick: () => this.setState({ device: d.id, issue: issueSets[d.type][0] }) })),
      issues: issueSets[cur.type].map((l) => ({ label: l, cls: st.issue === l ? 'on' : '', pressed: st.issue === l ? 'true' : 'false', pick: () => this.setState({ issue: l }) })),
      sumDevice: cur.name, sumIssue: step >= 2 ? st.issue : '—',
      noPrev: step === 1, prev: () => this.setState({ step: Math.max(1, step - 1) }),
      next: () => this.setState({ step: step + 1 }), nextLabel: step === 3 ? 'إرسال الطلب للمحلات' : 'التالي'
    };
  }
}

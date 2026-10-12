import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-center-register',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './center-register.component.html',
  styleUrl: './center-register.component.css',
})
export class CenterRegisterComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { devs: ['موبايل'], issues: [], del: false, docs: [false, false, false], sent: false }; }
  tog(key, v) { this.setState((s) => ({ [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : s[key].concat([v]) })); }
  renderVals() {
    const st = this.state;
    const dl = ['موبايل', 'تابلت', 'لابتوب', 'PC'], il = ['شاشات', 'بطاريات', 'الشحن', 'اللوحة الأم', 'التبريد', 'برمجيات'];
    const dn = ['السجل التجاري', 'البطاقة الضريبية', 'رخصة المحل'];
    const allDocs = st.docs.every(Boolean), ok = allDocs && st.devs.length > 0;
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      notSent: !st.sent, sent: st.sent,
      devs: dl.map((l) => ({ label: l, cls: st.devs.includes(l) ? 'on' : '', pressed: st.devs.includes(l) ? 'true' : 'false', toggle: () => this.tog('devs', l) })),
      issues: il.map((l) => ({ label: l, cls: st.issues.includes(l) ? 'on' : '', pressed: st.issues.includes(l) ? 'true' : 'false', toggle: () => this.tog('issues', l) })),
      delOn: st.del, delCls: st.del ? 'on' : '', delP: st.del ? 'true' : 'false', delText: st.del ? 'التوصيل مفعّل' : 'تفعيل خدمة التوصيل', toggleDel: () => this.setState((s) => ({ del: !s.del })),
      docs: dn.map((l, i) => ({ label: l, state: st.docs[i] ? 'تم الرفع' : 'لم يُرفع بعد', color: st.docs[i] ? 'var(--accent)' : 'var(--muted)', btn: st.docs[i] ? 'استبدال' : 'رفع ملف', pick: () => this.setState((s) => ({ docs: s.docs.map((v, j) => (j === i ? true : v)) })) })),
      cant: !ok, hint: ok ? 'جاهز للإرسال.' : 'ارفع الأوراق الثلاث واختر تخصصاً واحداً على الأقل.',
      submit: () => this.setState({ sent: true }), reset: () => this.setState({ sent: false })
    };
  }
}

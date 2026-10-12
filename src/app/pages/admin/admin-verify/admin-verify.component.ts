import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-admin-verify',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './admin-verify.component.html',
  styleUrl: './admin-verify.component.css',
})
export class AdminVerifyComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super();
    this.state = { sel: 1, why: '', apps: [
      { id: 1, name: 'ورشة الدلتا للصيانة', owner: 'المالك: [ الاسم ]', area: 'سموحة · الإسكندرية', specs: ['موبايل', 'تابلت', 'شاشات'], status: 'pending', checks: [false, false, false], note: '' },
      { id: 2, name: 'سمارت فيكس', owner: 'المالك: [ الاسم ]', area: 'العجمي · الإسكندرية', specs: ['لابتوب', 'PC', 'اللوحة الأم'], status: 'pending', checks: [true, true, false], note: '' },
      { id: 3, name: 'مركز المهندس', owner: 'المالك: [ الاسم ]', area: 'المنتزه · الإسكندرية', specs: ['موبايل', 'بطاريات'], status: 'pending', checks: [false, false, false], note: '' }
    ] };
  }
  patch(id, fn) { this.setState((s) => ({ apps: s.apps.map((a) => (a.id === id ? { ...a, ...fn(a) } : a)) })); }
  renderVals() {
    const st = this.state;
    const cur = st.apps.find((a) => a.id === st.sel);
    const labels = ['اسم المحل والمالك مطابقان للأوراق الرسمية', 'العنوان والموقع مطابقان للرخصة', 'التخصصات المطلوبة تتناسب مع نشاط المحل'];
    const stat = { pending: ['قيد المراجعة', 'var(--warn-soft)', 'var(--warn)'], approved: ['مقبول', 'var(--accent-soft)', 'var(--accent)'], rejected: ['مرفوض', 'var(--danger-soft)', 'var(--danger)'] };
    const allChecked = cur.checks.every(Boolean);
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      queue: st.apps.map((a) => ({ name: a.name, sub: a.area, status: stat[a.status][0], bg: stat[a.status][1], fg: stat[a.status][2], cls: a.id === st.sel ? 'on' : '', pressed: a.id === st.sel ? 'true' : 'false', pick: () => this.setState({ sel: a.id, why: '' }) })),
      cur: { name: cur.name, owner: cur.owner, area: cur.area, specs: cur.specs, status: stat[cur.status][0], bg: stat[cur.status][1], fg: stat[cur.status][2] },
      checks: labels.map((l, i) => ({ label: l, cls: cur.checks[i] ? 'on' : '', pressed: cur.checks[i] ? 'true' : 'false', op: cur.checks[i] ? 1 : 0, toggle: () => this.patch(cur.id, (a) => ({ checks: a.checks.map((v, j) => (j === i ? !v : v)) })) })),
      pending: cur.status === 'pending', decided: cur.status !== 'pending',
      decisionText: cur.status === 'approved' ? 'تم تفعيل حساب المحل وسيبدأ باستقبال الطلبات المتوافقة مع تخصصاته.' : 'تم رفض الطلب وإرسال السبب لصاحب المحل: ' + cur.note,
      setWhy: (e) => this.setState({ why: e.target.value }),
      cantApprove: !allChecked, cantReject: !st.why.trim(),
      approve: () => this.patch(cur.id, () => ({ status: 'approved' })),
      reject: () => this.patch(cur.id, () => ({ status: 'rejected', note: st.why }))
    };
  }
}

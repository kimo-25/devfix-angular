import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-center-jobs',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './center-jobs.component.html',
  styleUrl: './center-jobs.component.css',
})
export class CenterJobsComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super();
    this.state = { ticks: 0, jobs: [
      { id: 'a', device: 'iPhone 13', issue: 'شاشة مكسورة', price: 850, hours: 24, delivery: 'تسليم شخصي', status: 'awaiting', code: '', t0: 0, frozenRem: null },
      { id: 'b', device: 'Dell XPS 13', issue: 'سخونة زائدة', price: 1100, hours: 48, delivery: 'توصيل · ٤٠ جنيه', status: 'repairing', code: '', t0: -(48 * 3600 - (7 * 3600 + 20 * 60)), frozenRem: null },
      { id: 'c', device: 'Galaxy Tab S8', issue: 'منفذ الشحن', price: 640, hours: 30, delivery: 'تسليم شخصي', status: 'ready', code: '', t0: 0, frozenRem: null }
    ] };
  }
  componentDidMount() { this.timer = setInterval(() => this.setState((s) => ({ ticks: s.ticks + 1 })), 1000); }
  componentWillUnmount() { clearInterval(this.timer); }
  patch(id, fn) { this.setState((s) => ({ jobs: s.jobs.map((j) => (j.id === id ? { ...j, ...fn(j, s) } : j)) })); }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const pad = (x) => ar(String(x).padStart(2, '0'));
    const fmt = (t) => { t = Math.max(0, t); return pad(Math.floor(t / 3600)) + ':' + pad(Math.floor((t % 3600) / 60)) + ':' + pad(t % 60); };
    const st = this.state;
    const badges = { awaiting: ['بانتظار إيداع الجهاز', 'var(--primary-soft)', 'var(--primary)'], diagnosing: ['جاري التشخيص', 'var(--accent-soft)', 'var(--accent)'], repairing: ['جاري الإصلاح', 'var(--accent-soft)', 'var(--accent)'], ready: ['جاهز للتسليم', 'var(--primary-soft)', 'var(--primary)'], done: ['مكتمل', 'var(--accent-soft)', 'var(--accent)'] };
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      jobs: st.jobs.map((j) => {
        const b = badges[j.status];
        const frozen = j.frozenRem !== null;
        const hasTimer = j.status === 'diagnosing' || j.status === 'repairing';
        const rem = frozen ? j.frozenRem : j.hours * 3600 - (st.ticks - j.t0);
        const commission = Math.round(j.price * 0.1);
        return {
          id: j.id, device: j.device, issue: j.issue, price: ar(j.price), hours: ar(j.hours), grace: ar(Number(Math.min(j.hours * 0.2, 24).toFixed(1))), delivery: j.delivery,
          badge: frozen ? 'العداد متوقف' : b[0], badgeBg: frozen ? 'var(--warn-soft)' : b[1], badgeFg: frozen ? 'var(--warn)' : b[2],
          hasTimer, timer: fmt(rem), timerLabel: frozen ? 'العداد متوقف مؤقتاً' : 'الوقت المتبقي للتسليم', timerColor: frozen ? 'var(--muted)' : 'var(--accent)',
          isAwaiting: j.status === 'awaiting', isDiagnosing: j.status === 'diagnosing', isRepairing: j.status === 'repairing', isReady: j.status === 'ready', isDone: j.status === 'done',
          frozen, commission: ar(commission), net: ar(j.price - commission),
          setCode: (e) => this.patch(j.id, () => ({ code: e.target.value })),
          confirmIn: () => this.patch(j.id, (x, s) => ({ status: 'diagnosing', t0: s.ticks })),
          toRepair: () => this.patch(j.id, () => ({ status: 'repairing' })),
          toReady: () => this.patch(j.id, () => ({ status: 'ready' })),
          scope: () => this.patch(j.id, (x, s) => ({ frozenRem: x.hours * 3600 - (s.ticks - x.t0) })),
          confirmOut: () => this.patch(j.id, () => ({ status: 'done' }))
        };
      })
    };
  }
}

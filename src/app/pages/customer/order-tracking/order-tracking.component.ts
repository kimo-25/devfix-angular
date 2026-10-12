import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css',
})
export class OrderTrackingComponent extends DcBase {
  override defaults: Record<string, any> = {"stage": "repairing", "sla": "running"};
  constructor() { super(); this.state = { ticks: 0, code: null, otpTicks: 0 }; }
  componentDidMount() { this.timer = setInterval(() => this.setState((s) => ({ ticks: s.ticks + 1, otpTicks: s.code ? s.otpTicks + 1 : 0 })), 1000); }
  componentWillUnmount() { clearInterval(this.timer); }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const pad = (x) => ar(String(x).padStart(2, '0'));
    const fmt = (t) => { t = Math.max(0, t); return pad(Math.floor(t / 3600)) + ':' + pad(Math.floor((t % 3600) / 60)) + ':' + pad(t % 60); };
    const st = this.state;
    const stage = this.props.stage ?? 'repairing';
    const sla = this.props.sla ?? 'running';
    const order = ['deposit', 'diagnosing', 'repairing', 'ready', 'done'];
    const idx = order.indexOf(stage);
    const labels = ['تم الاستلام', 'جاري التشخيص', 'جاري الإصلاح', 'جاهز للتسليم', 'تم التسليم'];
    // step 0 is "checked in" => done once stage > deposit
    const stepIdx = [0, 1, 2, 3, 4];
    const nowIdx = stage === 'deposit' ? -1 : stage === 'diagnosing' ? 1 : stage === 'repairing' ? 2 : stage === 'ready' ? 3 : 5;
    const steps = stepIdx.map((i) => {
      let cls = '';
      if (stage === 'deposit') cls = i === 0 ? 'now' : '';
      else if (stage === 'done') cls = 'done';
      else if (i < nowIdx) cls = 'done';
      else if (i === nowIdx) cls = 'now';
      return { n: ar(i + 1), label: labels[i], cls };
    });
    const runningTotal = 18 * 3600 + 42 * 60 + 10;
    const graceTotal = 3 * 3600 + 12 * 60 + 44;
    let timerValue = fmt(runningTotal - st.ticks), timerTitle = 'الوقت المتبقي للتسليم', timerColor = 'var(--accent)', timerBorder = 'var(--line)';
    let mainPct = Math.min(100, ((24 * 3600 - (runningTotal - st.ticks)) / (24 * 3600)) * 100), gracePct = 0;
    if (sla === 'grace') { timerValue = fmt(graceTotal - st.ticks); timerTitle = 'الوقت المتبقي في مهلة الإنذار'; timerColor = 'var(--warn)'; timerBorder = 'var(--warn)'; mainPct = 100; gracePct = Math.min(100, ((4.8 * 3600 - (graceTotal - st.ticks)) / (4.8 * 3600)) * 100); }
    if (sla === 'late') { timerValue = '+' + fmt(1800 + st.ticks); timerTitle = 'تأخير بعد انتهاء المهلة'; timerColor = 'var(--danger)'; timerBorder = 'var(--danger)'; mainPct = 100; gracePct = 100; }
    if (sla === 'frozen') { timerValue = fmt(runningTotal - 600); timerTitle = 'العداد متوقف مؤقتاً'; timerColor = 'var(--muted)'; timerBorder = 'var(--primary)'; mainPct = ((24 * 3600 - (runningTotal - 600)) / (24 * 3600)) * 100; }
    const showTimer = stage === 'diagnosing' || stage === 'repairing';
    const statusMap = { deposit: ['بانتظار إيداع الجهاز', 'var(--primary-soft)', 'var(--primary)'], diagnosing: ['جاري التشخيص', 'var(--accent-soft)', 'var(--accent)'], repairing: ['جاري الإصلاح', 'var(--accent-soft)', 'var(--accent)'], ready: ['جاهز للتسليم', 'var(--primary-soft)', 'var(--primary)'], done: ['مكتمل', 'var(--accent-soft)', 'var(--accent)'] };
    let sm = statusMap[stage];
    if (showTimer && sla === 'grace') sm = ['مهلة إنذار', 'var(--warn-soft)', 'var(--warn)'];
    if (showTimer && sla === 'late') sm = ['تجاوز المهلة', 'var(--danger-soft)', 'var(--danger)'];
    if (showTimer && sla === 'frozen') sm = ['بانتظار موافقتك على تعديل', 'var(--primary-soft)', 'var(--primary)'];
    const showOtp = stage === 'deposit' || stage === 'ready';
    const code = st.code;
    const left = Math.max(0, 600 - st.otpTicks);
    const histAll = [
      { label: 'تم قبول العرض وحجز ٨٥٠ جنيه', time: 'اليوم · ١٠:٠٢ ص' },
      { label: 'تم تأكيد كود الإيداع — بدأ العداد', time: 'اليوم · ١٢:١٠ م' },
      { label: 'جاري التشخيص', time: 'اليوم · ١٢:٢٥ م' },
      { label: 'جاري الإصلاح', time: 'اليوم · ٢:٤٠ م' },
      { label: 'جاهز للتسليم', time: '—' },
      { label: 'تم التسليم وإغلاق الطلب', time: '—' }
    ];
    const count = [1, 2, 3, 4, 5][Math.max(0, Math.min(4, idx))] + (stage === 'deposit' ? 0 : 0);
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      steps, statusText: sm[0], statusBg: sm[1], statusFg: sm[2],
      showTimer, timerValue, timerTitle, timerColor, timerBorder,
      mainFlex: 24, graceFlex: 4.8, mainPct: mainPct.toFixed(1), gracePct: gracePct.toFixed(1),
      expectedAt: 'غداً · ١٢:١٠ م', graceAt: 'غداً · ٤:٥٨ م',
      isGrace: sla === 'grace', isLate: sla === 'late', isFrozen: sla === 'frozen',
      showOtp, noCode: !code, hasCode: !!code,
      otpTitle: stage === 'deposit' ? 'كود إيداع الجهاز' : 'كود استلام الجهاز',
      otpHelp: stage === 'deposit' ? 'عند وصولك للمحل ولّد الكود وأمله لموظف المحل. بعد تأكيده يبدأ العداد التنازلي رسمياً.' : 'عاين الجهاز أولاً، ثم ولّد الكود وأمله للمحل لإغلاق الطلب وسداد المبلغ من المحفظة.',
      otpBtn: stage === 'deposit' ? 'ولّد كود الإيداع' : 'ولّد كود الاستلام',
      genOtp: () => this.setState({ code: String(Math.floor(1000 + Math.random() * 9000)), otpTicks: 0 }),
      code: code || '', digits: code ? code.split('').map((d) => ar(d)) : [], otpLeft: fmt(left).slice(3),
      history: histAll.map((h, i) => ({ label: h.label, time: i <= (stage === 'deposit' ? 0 : idx + 1) ? h.time : '—' })).filter((h, i) => i <= (stage === 'done' ? 5 : Math.min(5, idx + 1)) ),
      cancelText: stage === 'deposit' ? 'الإلغاء الآن مجاني بالكامل ويُفك حجز المبلغ، لأن الجهاز لم يُسلَّم للمحل بعد.' : 'بعد تأكيد كود الإيداع يُخصم رسم فحص وتشخيص ثابت ٣٪ (٢٥٫٥ جنيه) لصالح المحل ويُرد الباقي لمحفظتك.'
    };
  }
}

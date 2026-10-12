import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-center-wallet',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './center-wallet.component.html',
  styleUrl: './center-wallet.component.css',
})
export class CenterWalletComponent extends DcBase {
  override defaults: Record<string, any> = {"delays": 1};
  constructor() { super(); this.state = { amount: '1000', requests: [] }; }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const st = this.state;
    const delays = Math.max(0, Math.min(3, this.props.delays ?? 1));
    const banned = delays >= 3;
    const pending = 1000 + st.requests.reduce((a, r) => a + r, 0);
    const base = [
      { title: 'أرباح طلب Galaxy Tab S8', sub: '٦٤٠ جنيه − عمولة ٦٤ جنيه · اليوم', status: 'مكتمل', amount: '+٥٧٦ جنيه', color: 'var(--accent)' },
      { title: 'طلب سحب إلى حساب بنكي', sub: 'أمس', status: 'قيد المعالجة', amount: '−١٬٠٠٠ جنيه', color: 'var(--ink)' },
      { title: 'غرامة تأخير (٥٪ من قيمة الطلب)', sub: 'طلب سابق · تعويض للعميل · قبل ٥ أيام', status: 'مكتمل', amount: '−٤٢٫٥ جنيه', color: 'var(--danger)' },
      { title: 'أرباح طلب Dell XPS 13', sub: '١٬١٠٠ جنيه − عمولة ١١٠ جنيه · قبل أسبوع', status: 'مكتمل', amount: '+٩٩٠ جنيه', color: 'var(--accent)' }
    ];
    const extra = st.requests.map((r) => ({ title: 'طلب سحب جديد', sub: 'الآن', status: 'قيد المعالجة', amount: '−' + ar(r) + ' جنيه', color: 'var(--ink)' }));
    const amt = Number(st.amount) || 0;
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      banned, dotColor: banned ? 'var(--danger)' : 'var(--accent)', statusShort: banned ? 'محظور مؤقتاً' : 'نشط',
      pendingText: ar(pending), amount: st.amount, setAmount: (e) => this.setState({ amount: e.target.value }),
      overLimit: amt > 3420, withdraw: () => this.setState((s) => ({ requests: s.requests.concat([Number(s.amount) || 0]) })),
      delaysText: ar(delays), dots: [0, 1, 2].map((i) => ({ bg: i < delays ? (banned ? 'var(--danger)' : 'var(--warn)') : 'var(--line)' })),
      banBg: banned ? 'var(--danger-soft)' : delays > 0 ? 'var(--warn-soft)' : 'var(--accent-soft)', banFg: banned ? 'var(--danger)' : delays > 0 ? 'var(--warn)' : 'var(--accent)',
      banTitle: banned ? 'محظور من الطلبات الجديدة لمدة ٧ أيام' : delays > 0 ? 'حسابك نشط لكن تقترب من الحد' : 'سجل نظيف',
      banText: banned ? 'عند تكرار بلوغ هذا الحد مرة ثانية خلال نفس السنة تصبح مدة الحظر ٣٠ يوماً.' : 'عند الوصول لـ ٣ مخالفات خلال ٣٠ يوماً يُحظر الحساب تلقائياً ٧ أيام. يُصفَّر العداد كل ٣٠ يوماً.',
      txs: extra.reverse().concat(base)
    };
  }
}

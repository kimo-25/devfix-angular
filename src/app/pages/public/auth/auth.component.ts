import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { mode: 'login', via: 'email', step: 'form', code: '', wrong: false, left: 30 }; }
  componentDidMount() { this.t = setInterval(() => this.setState((s) => ({ left: s.step === 'otp' && s.left > 0 ? s.left - 1 : s.left })), 1000); }
  componentWillUnmount() { clearInterval(this.t); }
  renderVals() {
    const st = this.state, ar = (n) => Number(n).toLocaleString('ar-EG');
    const reg = st.mode === 'register', em = st.via === 'email';
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      isForm: st.step === 'form', isOtp: st.step === 'otp', isDone: st.step === 'done', isReg: reg,
      loginCls: !reg ? 'on' : '', loginP: !reg ? 'true' : 'false', regCls: reg ? 'on' : '', regP: reg ? 'true' : 'false',
      setLogin: () => this.setState({ mode: 'login' }), setReg: () => this.setState({ mode: 'register' }),
      emailCls: em ? 'on' : '', emailP: em ? 'true' : 'false', phoneCls: !em ? 'on' : '', phoneP: !em ? 'true' : 'false',
      setEmail: () => this.setState({ via: 'email' }), setPhone: () => this.setState({ via: 'phone' }),
      title: reg ? 'أنشئ حسابك' : 'مرحباً بعودتك', sub: reg ? 'ثلاث دقائق وتبدأ في استقبال العروض.' : 'سجّل الدخول لمتابعة طلباتك.',
      idLabel: em ? 'البريد الإلكتروني' : 'رقم الموبايل', idPh: em ? 'name@example.com' : '01XXXXXXXXX', idShort: em ? 'البريد' : 'الرقم', target: em ? 'بريدك الإلكتروني' : 'رقم موبايلك',
      sendOtp: () => this.setState({ step: 'otp', left: 30, code: '', wrong: false }),
      setCode: (e) => this.setState({ code: e.target.value }),
      wrong: st.wrong,
      verify: () => (st.code.replace(/\D/g, '').length === 6 ? this.setState({ step: 'done' }) : this.setState({ wrong: true })),
      resendOff: st.left > 0, resendText: st.left > 0 ? 'إعادة الإرسال بعد ' + ar(st.left) + ' ثانية' : 'إعادة إرسال الكود', resend: () => this.setState({ left: 30 }),
      back: () => this.setState({ step: 'form' }),
      doneText: reg ? 'أضف جهازك الأول ليصبح جهازك الافتراضي.' : 'يمكنك متابعة طلباتك أو رفع طلب جديد.',
      doneBtn: reg ? 'أضف جهازك الأول' : 'الذهاب إلى طلباتي', doneHref: reg ? '/devices' : '/tracking'
    };
  }
}

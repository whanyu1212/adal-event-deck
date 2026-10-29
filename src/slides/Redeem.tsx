import { event } from '../event';
import { EditorialHeader } from '../components/EditorialHeader';
import { QR } from '../components/QR';
import { Tight } from '../components/Tight';

const p = event.promo;

/** Between the live demo and the build session: claim the free month, then the clock starts. */
export function Redeem() {
  return (
    <div className="slide redeem">
      <EditorialHeader kicker="Your turn · Before the clock starts">
        1 month of AdaL Pro, <span className="welcome-title-accent"><Tight text="free." /></span>
      </EditorialHeader>

      <div className="redeem-body">
        <QR value={p.signUp} size={300} caption="Scan to sign up" />

        <div className="redeem-main">
          <div className="redeem-code">
            <p className="label">Promo code</p>
            <p className="redeem-code-text">{p.code}</p>
            <p className="redeem-valid">
              {p.offer} · valid until {p.validUntil}
            </p>
          </div>

          <ol className="redeem-steps">
            <li>
              <span className="redeem-num">01</span>
              <strong>Sign up</strong>
              <span>
                Scan the QR or go to <b>{p.signUpLabel}</b>
              </span>
            </li>
            <li>
              <span className="redeem-num">02</span>
              <strong>Add the code</strong>
              <span>
                At <b>“Have a promo or referral code?”</b> when you pick your plan
              </span>
            </li>
            <li>
              <span className="redeem-num">03</span>
              <strong>Install</strong>
              <span>
                <b>{p.install}</b>, then open your project folder
              </span>
            </li>
          </ol>

          <p className="redeem-existing">
            Already have an account? <b>Settings → Billing → Have a promo code?</b>
          </p>
        </div>
      </div>
    </div>
  );
}

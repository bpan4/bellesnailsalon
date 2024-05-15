import { INSTAGRAM_URL, PRICING_NOTICES } from "../Constants";
import PricingTable from "./PricingTable";

const WorkPage = () => {
    const pricingNotices = () => {
        return (
        <div>
            {PRICING_NOTICES.map((notice) => {
            return <p className="tinytext" key={notice.title}>
                *<b>{notice.title}</b>: {notice.content}
            </p>
            })}
        </div>
        );
    }

    return (
        <div className="content content--work">
            <div className="text">
                <div className="title">
                    My Work
                </div>
                <div className="paragraph">
                    I specialize in gel manicures on natural nails and regular polish manicures.
                </div>
                <div className="paragraph">
                    {`To see my work, please visit my Instagram page, `}
                    <a 
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                    @nail.chimp
                    </a>.
                </div>
            </div>
            <div className="text">
                <div className="subtitle subtitle--pricing">
                    Pricing
                </div>
            </div>
            <div className="pricing__container">
                <PricingTable/>
            </div>
            <div className="text">
                { pricingNotices() }
            </div>
        </div>
    )
}

export default WorkPage;
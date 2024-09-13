
import dealImg from "../../assets/deals.png";
const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deal__image">
        <img src={dealImg} alt="" />
      </div>
      <div className="deals__content">
        <h4> Get Up To 20% Discount</h4>
        <h5>Deals For This Month</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          totam nihil obcaecati repellat voluptatum numquam, ipsum molestiae
          odio vero perspiciatis perferendis optio, magnam odit sapiente dolorum
          et voluptas sint accusantium!
        </p>
        <div className="deals__countdown flex_wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Minutes</p>
          </div>
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Second</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;

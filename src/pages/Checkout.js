import React, { Component } from "react";
import Header from "../parts/Header";
import Button from "../elements/Button";
import Stepper, {
  Numbering,
  Meta,
  MainContent,
  Controller,
} from "../elements/Stepper/index";
import BookingInformation from "../parts/Checkout/BookingInformation";
import Payment from "../parts/Checkout/Payment";
import Completed from "../parts/Checkout/Completed";
import ItemDetails from "../json/itemDetails.json";

export default class Checkout extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      proofPayment: "",
      bankName: "",
      bankHolder: "",
    },
  };
  onChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    const { data } = this.state;
    const Checkout = {
      duration: 3,
    };

    const steps = {
      BookingInformation: {
        title: "Booking Information",
        description: "Please fill up the blank fields below",
        content: (
          <BookingInformation
            data={data}
            Checkout={Checkout}
            ItemDetails={ItemDetails}
            onChange={this.onChange}
          />
        ),
      },
      payment: {
        title: "Payment",
        description: "Kindly follow the instructions below",
        content: (
          <Payment
            data={data}
            ItemDetails={ItemDetails}
            checkout={Checkout}
            onChange={this.onChange}
          />
        ),
      },
      completed: {
        title: "Yay! Completed",
        description: null,
        content: <Completed />,
      },
    };
    return (
      <>
        <Header isCentered />

        <Stepper steps={steps} initialStep="completed">
          {(prevStep, nextStep, CurrentStep, steps) => (
            <>
              <Numbering
                data={steps}
                current={CurrentStep}
                style={{ marginBottom: 50 }}
              />

              <Meta data={steps} current={CurrentStep} />

              <MainContent data={steps} current={CurrentStep} />

              {CurrentStep === "bookingInformation" && (
                <Controller>
                  {data.firstName !== "" &&
                    data.lastName !== "" &&
                    data.email !== "" &&
                    data.phone !== "" && (
                      <Button
                        className="btn mb-3"
                        type="button"
                        isBlock
                        isPrimary
                        hasShadow
                        onClick={nextStep}
                      >
                        Continue to Book
                      </Button>
                    )}
                  <Button
                    className="btn"
                    type="link"
                    isBlock
                    isLight
                    href={`/properties/${Checkout._id}`}
                  >
                    Cancel
                  </Button>
                </Controller>
              )}

              {CurrentStep === "payment" && (
                <Controller>
                  {data.proofPayment !== "" &&
                    data.bankName !== "" &&
                    data.bankHolder !== "" && (
                      <Button
                        className="btn mb-3"
                        type="button"
                        isBlock
                        isPrimary
                        hasShadow
                        onClick={() => this._Submit(nextStep)}
                      >
                        Continue to Book
                      </Button>
                    )}
                  <Button
                    className="btn"
                    type="button"
                    isBlock
                    isLight
                    onClick={prevStep}
                  >
                    Cancel
                  </Button>
                </Controller>
              )}

              {CurrentStep === "completed" && (
                <Controller>
                  <Button
                    className="btn"
                    type="link"
                    isBlock
                    isPrimary
                    hasShadow
                    href=""
                  >
                    Back to Home
                  </Button>
                </Controller>
              )}
            </>
          )}
        </Stepper>
      </>
    );
  }
}

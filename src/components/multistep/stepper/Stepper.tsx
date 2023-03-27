import React, {useContext, useEffect} from "react";
import {FormContext} from "../CreateEstateForm";

function Stepper() {
    // @ts-ignore
    const {activeStepIndex} = useContext(FormContext);
    useEffect(() => {
        const stepperItems = document.querySelectorAll(".stepper-item");
        stepperItems.forEach((step, i) => {
            if (i <= activeStepIndex) {
                step.classList.add("bg-indigo-500", "text-white");
            } else {
                step.classList.remove("bg-indigo-500", "text-white");
            }
        });
    }, [activeStepIndex]);
    return (
        <div
            style={{
                width: "2/3",
                display: "flex",
                flex: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundPositionX: "32",
                backgroundPositionY: "16",
            }}>


            <div style={{
                width: 8,
                height: 8,
                textAlign: "center",
                border: 2,
                borderRadius: "full"
            }}>
                1
            </div>
            <div
                style={{
                    flex: "auto",
                    borderTop: 2
                }}>

            </div>
            <div style={{
                width: 8,
                height: 8,
                textAlign: "center",
                border: 2,
                borderRadius: "full"
            }}>
                2
            </div>
            <div
                style={{
                    flex: "auto",
                    borderTop: 2
                }}>

            </div>
            <div style={{
                width: 8,
                height: 8,
                textAlign: "center",
                border: 2,
                borderRadius: "full"
            }}>
                3
            </div>
            <div
                style={{
                    flex: "auto",
                    borderTop: 2
                }}>

            </div>
            <div style={{
                width: 8,
                height: 8,
                textAlign: "center",
                border: 2,
                borderRadius: "full"
            }}>
                4
            </div>
        </div>
    );
}

export default Stepper;
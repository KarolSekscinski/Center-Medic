import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import PrescriptionListItem from "./PrescriptionListItem";


export default observer(function PrescriptionList() {
    const {prescriptionStore} = useStore();
    const {groupedPrescriptions} = prescriptionStore;

    return (
        <>
            {groupedPrescriptions.map(([group, prescriptions]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {prescriptions.map(prescription => (
                        <PrescriptionListItem key={prescription.id} prescription={prescription} />
                    ))}
                </Fragment>
            ))}
        </>
    );
});
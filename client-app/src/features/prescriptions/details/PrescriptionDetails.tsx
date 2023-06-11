import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PrescriptionDetailedInfo from "./PrescriptionDetailedInfo";
import PrescriptionDetailedHeader from "./PrescriptionDetailedHeader";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer(function PrescriptionDetails() {

    const {prescriptionStore} = useStore();
    const {selectedPrescription: prescription, loadPrescription, loadingInitial} = prescriptionStore;
    const {id} = useParams();

    useEffect(() => {
        if (id) loadPrescription(id); 
    },[id, loadPrescription])

    if (loadingInitial || !prescription) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <PrescriptionDetailedHeader prescription={prescription} />
                <PrescriptionDetailedInfo prescription={prescription} />

            </Grid.Column>
            {/* <Grid.Column width={6} >
                <PrescriptionDetailedSidebar prescription={prescription} />
            </Grid.Column> */}
        </Grid>
    );
});
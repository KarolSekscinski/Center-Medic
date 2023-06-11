import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Grid } from "semantic-ui-react";
import PrescriptionList from "./PrescriptionList";
import PrescriptionFilters from "./PrescriptionFilters";




export default function PrescriptionDashBoard() {
    const { prescriptionStore } = useStore();
    const { loadPrescriptions, prescriptionRegistry } = prescriptionStore;

    useEffect(() => {
        if (prescriptionRegistry.size <= 1) loadPrescriptions();
    },[loadPrescriptions, prescriptionRegistry.size]);

    if (prescriptionStore.loadingInitial) 
        return <LoadingComponent content='Ładowanie recept...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <PrescriptionList />
            </Grid.Column>
            <Grid.Column width='6'>
                <PrescriptionFilters />
            </Grid.Column>


        </Grid>
    )
}
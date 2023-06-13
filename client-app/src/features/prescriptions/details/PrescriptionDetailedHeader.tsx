import { Segment, Image, Label, Item, Header, Icon, Button, Form } from "semantic-ui-react";
import { Prescription } from "../../../app/models/prescription";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import PatientsSelectInput from "../../../app/common/form/PatientsSelectInput";

const prescriptionImageStyle = {
    filter: 'brightness(30%)',
};

const prescriptionImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
}

interface Props {
    prescription: Prescription;
}

export default observer(function PrescriptionDetailedHeader({prescription}: Props) {
    const {prescriptionStore: {updateAttendance, loading, cancelPrescriptionToggle, deletePrescription}} = useStore();
    const nr = prescription.id.split('-')[0].toLowerCase();
    const [isDoctor, setIsDoctor] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const size = prescription.attendees.length;
    const user = useStore().userStore.user;
    const patient = prescription.attendees.find(x => x.displayName !== prescription.doctorUserProfile?.displayName);
    useEffect(() => {
        if (user?.isDoctor === 'true') {
            setIsDoctor(true);
        }
    }, [user?.isDoctor]);
    const cancelPrescriptionHandler = () => {
        setIsDisabled(true);
        prescription.isCancelled = true;
        cancelPrescriptionToggle();
    };
    console.log(prescription)
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {prescription.status ? (
                    <Label
                        style={{position: 'absolute', zIndex: 1, left: -14, top: 20}}
                        ribbon color='orange'
                        content='Recepta w trakcie realizacji'
                    />
                ) :
                <Label
                    style={{position: 'absolute', zIndex: 1, left: -14, top: 20}}
                    ribbon color='grey'
                    content='Recepta zrealizowana'
                />}
                <Image src={`/assets/categoryImages/gabinet.jpg`} fluid style={prescriptionImageStyle}/>
                <Segment style={prescriptionImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='medium'
                                    content={`Recepta nr ${nr} `}
                                    style={{color: 'white'}}
                                />
                                <p>{format(prescription.dateOfIssue!, 'dd MMM yyyy')}</p>
                                <p>
                                    Lekarz: {'Dr. '}
                                    <strong>
                                        <Link to={`/profiles/${prescription.doctorUserProfile?.displayName}`}>
                                            {prescription.doctorUserProfile?.displayName}
                                        </Link>
                                    </strong>
                                </p>
                                {patient?.displayName && (
                                   <p>
                                    Pacjent: {`${patient?.displayName}`}
                                </p>  
                                )}
                               
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            {isDoctor && size !== 2 && (
            <Segment basic style={{padding: '0', marginBottom: '3rem'}}>
                <span>
                    <Formik enableReinitialize initialValues={prescription} onSubmit={(values) => updateAttendance(values.patient)}>
                        {({handleSubmit}) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <PatientsSelectInput />
                        <Button
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Zapisz'
                        />
                        </Form>
                        )}
                    </Formik>
                </span>
            </Segment>)}                       
            <Segment clearing attached='bottom'>
                {isDoctor ? (
                    <>
                        <Button
                            color={prescription.isCancelled ? 'green' : 'red'}
                            floated='left'
                            basic
                            content={prescription.isCancelled ? 'Recepta zrealizowana' : 'Cofnij wydanie recepty'}
                            onClick={cancelPrescriptionHandler}
                            loading={loading}
                            />
                            <Button onClick={() => deletePrescription(prescription.id)} floated='right' color='red' content="Usuń receptę"/>
                            <Button
                                as={Link}
                                to={`/managePrescription/${prescription.id}`}
                                color='orange'
                                floated='right'
                                content='Edytuj receptę'
                            />
                    </>
                ) : prescription.isGoing ? (
                    <Button loading={loading} onClick={cancelPrescriptionHandler} color='red'>
                        Anuluj receptę    
                    </Button > 
                ) : (
                    <Button loading={loading} onClick={cancelPrescriptionHandler} color='teal' disabled={isDisabled}>
                        Anuluj receptę
                    </Button>
                )}
            </Segment>
        </Segment.Group>
    );
});

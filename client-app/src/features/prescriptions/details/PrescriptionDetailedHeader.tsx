import { Segment, Image, Label, Item, Header, Icon, Button } from "semantic-ui-react";
import { Prescription } from "../../../app/models/prescription";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

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
    const {prescriptionStore: {updateAttendance, loading, cancelPrescriptionToggle}} = useStore();

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {!prescription.status ? (
                    <Label
                        style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}}
                        ribbon color='orange'
                        content='Recepta w trakcie realizacji'
                    />
                ) :
                <Label
                    style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}}
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
                                    content={`Recepta nr `}
                                    style={{color: 'white'}}
                                />
                                <p>{format(prescription.dateOfIssue!, 'dd MMM yyyy')}</p>
                                <p>
                                    Lekarz: {'Dr. '}
                                    <strong>
                                        <Link to={`/profiles/${prescription.doctor?.username}`}>
                                            {prescription.doctor?.displayName}
                                        </Link>
                                    </strong>
                                </p>
                                
                            
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {prescription.status ? (
                    <>
                        <p>TODO dodaj zarzadzanie recepta</p>
                        <p>dodac przycisk zrealizowania recepty</p>
                    </>
                ) : null}
            </Segment>
        </Segment.Group>
    )
});

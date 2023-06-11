import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import React from "react";
export default function PrescriptionFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: '30' }}>
                <Header icon='filter' attached color='teal' content='Filtruj recepty' />
                <Menu.Item content='Wszystkie recepty' />
                <Menu.Item content='Recepty zrealizowane' />
                <Menu.Item content='Recepty niewykorzystane' />
            </Menu>
            <Header />
            <Calendar />



        </>
    );
}
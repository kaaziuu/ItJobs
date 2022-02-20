import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { history } from "../..";
import CenterContainer from "../../layout/common/CenterContainer";
import { UseStore } from "../../stores/Store";
import CreateClass from "../../utils/components/CreateClass";
import Path from "../../utils/route/Path";

const MyCompany: React.FC = () => {
    const { companyStore } = UseStore();
    const [cookie] = useCookies(["token"]);
    const baseClass = "my-company";

    useEffect(() => {
        companyStore.fetchMyCompany(cookie.token!);
    }, [companyStore, cookie.token]);

    if (companyStore.isLoading || !companyStore.getIsCompanyLoaded) {
        return <h1>loading</h1>;
    }

    if (companyStore.getIsCompanyLoaded && companyStore.getCompany === undefined) {
        history.push(Path.createCompany);
        return <></>;
    }

    // todo: add stast
    const company = companyStore.getCompany;
    return (
        <CenterContainer containerClass={baseClass}>
            <Card className={CreateClass(baseClass, "card")}>
                <Card.Header className={CreateClass(baseClass, "card-header")}>
                    <h1>{company!.name}</h1>
                    {company!.motto ? <h5> {company?.motto} </h5> : null}
                </Card.Header>
                <Card.Body>
                    <Card.Title>Size of comapny: {company!.size}</Card.Title>
                    <Card.Text>{company!.description}</Card.Text>
                </Card.Body>
            </Card>
        </CenterContainer>
    );
};

export default observer(MyCompany);

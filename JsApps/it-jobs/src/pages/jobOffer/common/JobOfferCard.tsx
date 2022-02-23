import { Button, Card, Col } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { history } from "../../..";
import JobOffer from "../../../service/jobOffer/models/JobOffer";
import CreateClass from "../../../utils/components/CreateClass";
import Path from "../../../utils/route/Path";

interface props {
    jobOffer: JobOffer;
    baseClass: string;
}

const JobOfferCard = ({ jobOffer, baseClass }: props) => {
    return (
        <Card className={CreateClass(baseClass, "card")}>
            <Card.Header as="h4" className={CreateClass(baseClass, "card-header")}>
                {jobOffer.company.name}
            </Card.Header>
            <Card.Body className={CreateClass(baseClass, "card-body")}>
                <Card.Title className={CreateClass(baseClass, "card-body-title")}>{jobOffer.position}</Card.Title>
                <Card.Subtitle className={CreateClass(baseClass, "card-body-subtitle")}>
                    pay scales from: {jobOffer.minimumSalary} <CurrencyEuro />, to: {jobOffer.maximumSalary}
                    <CurrencyEuro />
                </Card.Subtitle>
                <Card.Text className={CreateClass(baseClass, "card-body-text")}>{jobOffer.description}</Card.Text>
                <Button
                    variant="primary"
                    className={CreateClass(baseClass, "card-body-button")}
                    onClick={() => {
                        history.push(`${Path.jobOfferDetails.replace(":uuid", jobOffer.uuid)}`);
                    }}
                >
                    show details
                </Button>
            </Card.Body>
        </Card>
    );
};

export default JobOfferCard;

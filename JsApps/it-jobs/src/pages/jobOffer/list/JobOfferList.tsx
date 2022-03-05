import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import CenterContainer from "../../../layout/common/CenterContainer";
import { UseStore } from "../../../stores/Store";
import CreateClass from "../../../utils/common/CreateClass";
import { useQuery } from "../../../utils/route/Path";
import JobOfferCard from "./JobOfferCard";

const JobOfferList = () => {
    const query = useQuery();
    const { jobOfferStore } = UseStore();
    const baseClass = "job-offer-list";
    const [cookie] = useCookies(["token"]);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [searchHelper, setSearchHelper] = useState("");

    const searchAction = () => {
        setSearch(searchHelper);
    };

    useEffect(() => {
        const onlyMy = query.get("only-my") === "true";
        if (onlyMy) {
            jobOfferStore.fetchMyJobOffer(cookie.token, search);
        } else {
            jobOfferStore.fetchAllJobOffes(search);
        }
    }, [jobOfferStore, query, cookie.token, search]);

    if (jobOfferStore.isLoading) {
        return <h1>loading...</h1>;
    }

    return (
        <>
            <CenterContainer containerClass={CreateClass(baseClass, "search-container")}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="search">Search by position</InputGroup.Text>
                    <FormControl
                        className={CreateClass(baseClass, "search-input")}
                        placeholder="Search by position"
                        aria-describedby="search"
                        onChange={(e) => setSearchHelper(e.target.value)}
                        value={searchHelper}
                    />
                    <Button type="button" variant="primary" onClick={searchAction}>
                        Search
                    </Button>
                </InputGroup>
            </CenterContainer>
            <Container className={CreateClass(baseClass, "container")}>
                <Row xs={1} md={3} className={CreateClass(baseClass, "row")}>
                    {jobOfferStore.getJobOffers.map((x) => (
                        <Col key={x.uuid} className={CreateClass(baseClass, "col")}>
                            <JobOfferCard jobOffer={x} baseClass={baseClass} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default observer(JobOfferList);

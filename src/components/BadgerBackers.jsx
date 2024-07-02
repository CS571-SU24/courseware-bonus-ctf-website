import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BadgerBackee from "./BadgerBackee";

export default function BadgerBackers() {

    const [user, setUser] = useState()

    const [bux, setBux] = useState(500);

    const [backees, setBackees] = useState([]);

    function fetchUser() {
        fetch("https://cs571api.cs.wisc.edu/rest/su24/bonus/whoami", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }
        )
        .then(res => res.json())
        .then(res => setUser(res.email))
    }

    function resetPurchases() {
        fetch("https://cs571api.cs.wisc.edu/rest/su24/bonus/backings", {
            method: "DELETE",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }
        )
        .then(res => reloadBackingData())
    }

    function reloadBackingData() {
        fetch("https://cs571api.cs.wisc.edu/rest/su24/bonus/backees", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }
        )
        .then(res => res.json())
        .then(res => setBackees(res))
    }

    useEffect(() => {
        fetchUser();
        reloadBackingData();
    }, [])

    useEffect(() => {
        setBux(500 - backees.reduce((acc, curr) => acc + curr.amountGiven, 0))
    }, [backees])

    return <div>
        <Container>
            
            <Row style={{ textAlign: "left" }}>
                {
                    user ?
                        <h2 style={{ fontSize: "1.5rem" }}>Welcome back, {user}!</h2> :
                        <h2 style={{ fontSize: "1.5rem" }}>Welcome back!</h2>
                }
                
                <p>You have <strong>{bux}</strong> bux remaining. Spend these on your favorite startup ideas!</p>
                
            </Row>
            <Button variant="secondary" onClick={resetPurchases} style={{marginBottom: "1rem"}}>Reset Purchases</Button>
            <Row>
                {
                    backees.map(b => <Col key={b.name} xs={12} md={6} lg={4} xl={3}>
                        <BadgerBackee {...b} totalRemain={bux} notifyParent={reloadBackingData} />
                    </Col>)
                }
                <Col>
                </Col>
            </Row>
        </Container>
    </div>
}
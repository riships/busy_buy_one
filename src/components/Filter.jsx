import React from 'react';
import { Form } from 'react-bootstrap';

function Filter({ setPriceRange, setCategories, priceRange }) {

    return (
        <div className="filter-container">
            <Form>
                <Form.Group>
                    <Form.Label>
                        Selected Price Range: ${priceRange}
                    </Form.Label>
                    <Form.Range
                        min={0}
                        max={100000}
                        step={100}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        value={priceRange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Filter by Categories</Form.Label>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Men's Clothing"
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Women's Clothing"
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Jewelery"
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Electronics"
                    />
                </Form.Group>
            </Form>
        </div>
    );
}

export default Filter;

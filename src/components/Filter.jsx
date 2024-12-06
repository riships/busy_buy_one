import React from 'react';
import { Form } from 'react-bootstrap';

function Filter({ setPriceRange, setCategories, priceRange }) {

    return (
        <aside className="filter_container">
            <h2>Filter</h2>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Price Range: &#8377; {priceRange}
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
                        onChange={(e) => {
                            setCategories((prev) => ({
                                ...prev,
                                mensFashion: e.target.checked
                            }))
                        }}
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Women's Clothing"
                        onChange={(e) => {
                            setCategories((prev) => ({
                                ...prev,
                                womensFashion: e.target.checked
                            }))
                        }}
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Jewelery"
                        onChange={(e) => {
                            setCategories((prev) => ({
                                ...prev,
                                jewelery: e.target.checked
                            }))
                        }}
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Electronics"
                        onChange={(e) => {
                            setCategories((prev) => ({
                                ...prev,
                                electronics: e.target.checked
                            }))
                        }}
                    />
                </Form.Group>
            </Form>
        </aside>
    );
}

export default Filter;

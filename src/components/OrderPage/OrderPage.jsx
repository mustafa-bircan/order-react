import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import './OrderPage.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CheckBox from './CheckBox';
import axios from 'axios';

function OrderPage() {
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        dough: '',
        ingredients: [],
    });
    const [errors, setErrors] = useState({
        name: '',
        ingredients: '',
        size: '',
        dough: '',
    });
    const [isValid, setIsValid] = useState(false);
    const [pizzaCount, setPizzaCount] = useState(1);

    const pizzaPrice = 85.5;
    const ingredientPrice = 5;

    const ingredients = [
        { label: "Pepperoni", value: "Pepperoni" },
        { label: "Sosis", value: "Sosis" },
        { label: "Kanada Jambonu", value: "Kanada Jambonu" },
        { label: "Tavuk Izgara", value: "Tavuk Izgara" },
        { label: "Soğan", value: "Soğan" },
        { label: "Domates", value: "Domates" },
        { label: "Mısır", value: "Mısır" },
        { label: "Sucuk", value: "Sucuk" },
        { label: "Jalepeno", value: "Jalepeno" },
        { label: "Sarımsak", value: "Sarımsak" },
        { label: "Biber", value: "Biber" },
        { label: "Zeytin", value: "Zeytin" },
        { label: "Ananas", value: "Ananas" },
        { label: "Kabak", value: "Kabak" },
        { label: "Salam", value: "Salam" }
    ];

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ingredients: ingredients.slice(0, 4).map((ingredient) => ingredient.value),
        }));
    }, []);

    useEffect(() => {
        const ingredientError = formData.ingredients.length < 4
            ? 'En az 4 malzeme seçilmesi gerekiyor.'
            : formData.ingredients.length > 10
                ? 'En fazla 10 malzeme seçebilirsiniz.'
                : '';
        const nameError = formData.name.length < 3 ? 'İsim en az 3 karakter olmalı.' : '';
        const sizeError = !formData.size ? 'Pizza boyutu seçilmelidir.' : '';
        const doughError = !formData.dough ? 'Hamur kalınlığı seçilmelidir.' : '';

        setErrors({
            name: nameError,
            ingredients: ingredientError,
            size: sizeError,
            dough: doughError,
        });

        setIsValid(!nameError && !ingredientError && !sizeError && !doughError);
    }, [formData]);

    const handleCheckChange = (event) => {
        const { value, checked } = event.target;
        setFormData(prevState => {
            const newIngredients = checked
                ? [...prevState.ingredients, value]
                : prevState.ingredients.filter(item => item !== value);

            return { ...prevState, ingredients: newIngredients };
        });
    };

    const handlePizzaCountChange = (type) => {
        if (type === "increment") {
            setPizzaCount(pizzaCount + 1);
        } else if (type === "decrement" && pizzaCount > 1) {
            setPizzaCount(pizzaCount - 1);
        }
    };

    const totalIngredientsPrice = formData.ingredients.length * ingredientPrice;
    const totalPrice = (pizzaPrice + totalIngredientsPrice) * pizzaCount;

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        if (isValid) {
            const payload = {
                name: formData.name,
                size: formData.size,
                dough: formData.dough,
                ingredients: formData.ingredients,
                pizzaCount: pizzaCount,
                totalPrice: totalPrice.toFixed(2),
            };
    
            axios.post('https://reqres.in/api/pizza', payload)
                .then((response) => {
                    console.log('Sipariş başarıyla alındı: ', response.data);
                    history.push('/Success');
    
                    
                    console.log('Sipariş Özeti:', {
                        id: response.data.id,
                        name: response.data.name,
                        size: response.data.size,
                        dough: response.data.dough,
                        ingredients: response.data.ingredients.join(', '),
                        pizzaCount: response.data.pizzaCount,
                        totalPrice: response.data.totalPrice,
                    });
    
                   
                })
                .catch((error) => {
                    console.error('Sipariş gönderilirken bir hata oluştu:', error);
                });
        }
    };

    return (
        <>
            <div className='order-general'>
                <div className="order-section">
                    <div className="order-content">
                        <img src='../images/iteration-1-images/logo.svg' />
                    </div>
                    <div className="navigation-links">
                        <Link to='/' className="navigation-link">Anasayfa</Link>
                        <Link className="navigation-link">Sipariş Oluştur</Link>
                    </div>
                </div>

                <div className='main-order'>
                    <div className='product-information'>
                        <h5>Position Absolute Acı Pizza</h5>
                        <div className='price-and-rating'>
                            <div className='price'>{pizzaPrice}₺</div>
                            <div className='product-point'>
                                <div>4.9</div>
                                <div>(200)</div>
                            </div>
                        </div>
                        <p>
                            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre...
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <div className='form-row'>
                            <FormGroup className='col'>
                                <Label for="chooseSize">
                                    <strong>Boyut Seç</strong> <span className='required'>*</span>
                                </Label>
                                <FormGroup>
                                    <Input
                                        type="radio"
                                        name="size"
                                        value="small"
                                        id="small"
                                        invalid={errors.size !== ''}
                                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    />
                                    <Label htmlFor='small'>Küçük</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="radio"
                                        name="size"
                                        value="medium"
                                        id="medium"
                                        invalid={errors.size !== ''}
                                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    />
                                    <Label htmlFor='medium'>Orta</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="radio"
                                        name="size"
                                        value="large"
                                        id="large"
                                        invalid={errors.size !== ''}
                                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    />
                                    <Label htmlFor='large'>Büyük</Label>
                                </FormGroup>
                                {errors.size && <FormFeedback>{errors.size}</FormFeedback>}
                            </FormGroup>

                            <FormGroup className='col'>
                                <Label for="chooseDough">
                                    <strong>Hamur Seç</strong> <span className='required'>*</span>
                                </Label>
                                <Input
                                    id="doughSelection"
                                    name="dough"
                                    type="select"
                                    invalid={errors.dough !== ''}
                                    onChange={(e) => setFormData({ ...formData, dough: e.target.value })}
                                >
                                    <option value=''>Hamur Seçiniz</option>
                                    <option value='İnce Hamur'>İnce Hamur</option>
                                    <option value='Orta Hamur'>Orta Hamur</option>
                                    <option value='Kalın Hamur'>Kalın Hamur</option>
                                    <option value='Dolgulu Hamur'>Dolgulu Hamur</option>
                                    <option value='Ekşi Mayalı Hamur'>Ekşi Mayalı Hamur</option>
                                    <option value='Glutenli Hamur'>Glutenli Hamur</option>
                                </Input>
                                {errors.dough && <FormFeedback>{errors.dough}</FormFeedback>}
                            </FormGroup>
                        </div>

                        <div className='additional-ingredients'>
                            <h6><strong>Ek Malzemeler</strong></h6>
                            <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>

                            <div className='ingredients-list'>
                                {ingredients.map((ingredient) => (
                                    <div className='checkbox-item' key={ingredient.value}>
                                        <CheckBox
                                            name='ingredients'
                                            label={ingredient.label}
                                            value={ingredient.value}
                                            onChange={handleCheckChange}
                                            isChecked={formData.ingredients.includes(ingredient.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className='selected-list'>
                                <Input
                                    type="hidden"
                                    invalid={errors.ingredients !== ''}
                                />
                                <FormFeedback>{errors.ingredients}</FormFeedback>
                                <strong>Seçilen Malzemeler: </strong>
                                {formData.ingredients.length > 0
                                    ? formData.ingredients.join(", ")
                                    : "Hiçbir malzeme seçilmedi!"
                                }
                            </div>
                        </div>

                        <div className='user-name'>
                            <FormGroup>
                                <Label for="name">
                                    <strong>Ad-Soyad</strong>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Size hitap edebilmemiz için adınızı ve soyadınızı girin lütfen"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    type="text"
                                    invalid={errors.name !== ''}
                                />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                        </div>

                        <div className='order-summary'>
                            <div className='orderAdd-button'>
                                <Button color="warning" onClick={() => handlePizzaCountChange("decrement")}>
                                    -
                                </Button>
                                <div>{pizzaCount}</div>
                                <Button color="warning" onClick={() => handlePizzaCountChange("increment")}>
                                    +
                                </Button>
                            </div>
                            <div className='order-total'>
                                <strong>Sipariş Toplamı</strong>
                                <div className='choices'>Seçimler: {totalIngredientsPrice.toFixed(2)}₺</div>
                                <div className='total-price'>Toplam: {totalPrice.toFixed(2)}₺</div>
                            
                                <Button color="warning" type="submit" disabled={!isValid}>
                                    Sipariş Ver
                                </Button>
                                
                            </div>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    );
}

export default OrderPage;

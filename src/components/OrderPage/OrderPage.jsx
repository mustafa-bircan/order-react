import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import './OrderPage.css';
import { useHistory, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import CheckBox from './CheckBox';
import Footer from '../FooterPage/Footer';
import axios from 'axios';


function OrderPage({setOrderDetails}) {

    const pizzaTypes = [
        { 
            name: 'Acı Pizza', 
            description: 'Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.', 
            price: 85.5, 
            rating: 4.7, 
            reviews: 200 
        },
        { 
            name: 'Margarita', 
            description: 'React’te hala class component kullanıyorsan, bu pizza tam sana göre! Geleneksel ve zamansız bir seçim olan Margarita pizzası, tıpkı class component gibi köklü ve sağlamdır. Ancak zamanla hooks gibi modern yaklaşımlar geldi ve function component’ler gibi daha hafif ve hızlı çözümler ortaya çıktı. Ama yine de Margarita gibi klasikler her zaman favorilerden biri olarak kalır.', 
            price: 75.5, 
            rating: 4.7, 
            reviews: 200 
        },
        { 
            name: 'Peperoni', 
            description: 'Hala useEffect’i yanlış dependency array ile kullanıyorsan, Peperoni gibi biraz fazla yoğun bir deneyim yaşayabilirsin! Peperoni pizzası gibi güçlü bir tada sahip olan bu teknik, yanlış kullanıldığında gereksiz render’lara ve ağır performans sorunlarına yol açabilir. O yüzden iyi optimize edilmiş bir React kodu gibi, malzemeleri dengeli kullanmayı unutma!', 
            price: 90.0, 
            rating: 4.7, 
            reviews: 200 
        },
        { 
            name: 'Veggie', 
            description: 'React’te gereksiz re-render’lar yaparak performansı zorluyorsan, belki biraz hafifletici bir seçenek olan Veggie pizzaya ihtiyacın var! Pure component’ler ve useMemo gibi optimizasyonlarla sayfanı hızlandırabilirsin. Tıpkı sebzelerle hafifletilmiş bu pizza gibi, kodunu da gereksiz yüklerden arındırmalısın.', 
            price: 80.0, 
            rating: 4.7, 
            reviews: 200 
        },
        { 
            name: 'BBQ', 
            description: 'Eğer tüm state’leri tek bir yerde yönetmeye çalışıyorsan, Redux kullanmaya başlamak gibidir: Başta karmaşık görünebilir ama alışınca vazgeçemezsin! BBQ pizzası da aynı şekilde yoğun ve bol malzemeli olabilir, ama doğru kullanıldığında harika bir deneyim sunar. State yönetimini iyi organize et, aksi takdirde elinde dağılan bir pizza (ve proje) ile karşılaşabilirsin.', 
            price: 95.0, 
            rating: 4.7, 
            reviews: 200 
        }
    ];
    

    const [formData, setFormData] = useState({
        name: '',
        size: '',
        dough: '',
        ingredients: [],
        note: '',
        pizzaType: null,
    });
    const [errors, setErrors] = useState({
        name: '',
        ingredients: '',
        size: '',
        dough: '',
        note: '',
        pizzaType:'',
    });
    const [isValid, setIsValid] = useState(false);
    const [pizzaCount, setPizzaCount] = useState(1);

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
        const ingredientError = formData.ingredients.length < 4
            ? 'En az 4 malzeme seçilmesi gerekiyor.'
            : formData.ingredients.length > 10
                ? 'En fazla 10 malzeme seçebilirsiniz.'
                : '';
        const nameError = formData.name.length < 3 ? 'İsim en az 3 karakter olmalı.' : '';
        const sizeError = !formData.size ? 'Pizza boyutu seçilmelidir.' : '';
        const doughError = !formData.dough ? 'Hamur kalınlığı seçilmelidir.' : '';
        const pizzaTypeError = !formData.pizzaType ? 'Pizza türü seçilmelidr.' : '';

        setErrors({
            name: nameError,
            ingredients: ingredientError,
            size: sizeError,
            dough: doughError,
            pizzaType: pizzaTypeError
        });

        setIsValid(!nameError && !ingredientError && !sizeError && !doughError && !pizzaTypeError);
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

    const handlePizzaCountChange = (description) => {
        if (description === "increment") {
            setPizzaCount(pizzaCount + 1);
        } else if (description === "decrement" && pizzaCount > 1) {
            setPizzaCount(pizzaCount - 1);
        }
    };

    const totalIngredientsPrice = formData.ingredients.length * ingredientPrice;
    const totalPrice = ((formData.pizzaType?.price || 0) + totalIngredientsPrice) * pizzaCount;
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isValid) {

            axios.post('https://reqres.in/api/pizza', {...formData, totalPrice, totalIngredientsPrice})
                .then((response) => {
                    console.log('Sipariş başarıyla alındı: ', response.data);
                    setOrderDetails(response.data);
                    history.push(`/success`);


                    console.log('Sipariş Özeti:', {
                        id: response.data.id,
                        Name: response.data.name,
                        Size: response.data.size,
                        Dough: response.data.dough,
                        Ingredients: response.data.ingredients.join(', '),
                        PizzaCount: response.data.pizzaCount,
                        TotalPrice: response.data.totalPrice,
                        Note: formData.note,
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
                </div>
                <div className='main-content'>
                    <img src='/images/iteration-2-images/pictures/form-banner.png' />

                    <div className="navigation-links">
                        <NavLink
                            to='/'
                            className="navigation-link"
                            activeClassName="active-link"
                            data-cy="homepage-link"
                        >
                            Anasayfa
                        </NavLink>
                        <NavLink
                            to='/OrderPage'
                            className="navigation-link"
                            activeClassName="active-link"
                            data-cy="orderpage-link"
                        >
                            Sipariş Oluştur
                        </NavLink>
                    </div>
                    <div className='pizza-description'>
                        <FormGroup>
                            <Label for="pizzaType">
                                <strong>Pizza Türü Seç</strong> <span className='required'>*</span>
                            </Label>
                            <Input
                                id="pizzaType"
                                name="pizzaType"
                                type="select"
                                invalid={errors.pizzaType !== ''}
                                onChange={(event) => setFormData({ ...formData, pizzaType: pizzaTypes.find(pizza => pizza.name === event.target.value) })}
                                data-cy="pizza-type"
                            >
                                <option value="" hidden>Pizza Türü Seçiniz</option>
                                {pizzaTypes.map((pizza) => (
                                    <option key={pizza.name} value={pizza.name}>{pizza.name}</option>
                                ))}
                            </Input>
                            {errors.pizzaType && <FormFeedback data-cy="pizza-type-error">{errors.pizzaType}</FormFeedback>}
                        </FormGroup>
                        <div className='product-information'>
                            {formData.pizzaType && (
                                <>
                                    <h5>{formData.pizzaType.name}</h5>
                                    <div className='price-and-rating'>
                                        <div className='price'>{formData.pizzaType.price}₺</div>
                                    </div>
                                    <p>{formData.pizzaType.description}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='main-order'>
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
                                    value="Small"
                                    id="small"
                                    invalid={errors.size !== ''}
                                    onChange={(event) => setFormData({ ...formData, size: event.target.value })}
                                    data-cy="size-small"
                                />
                                <Label htmlFor='small'>Small</Label>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="radio"
                                    name="size"
                                    value="Medium"
                                    id="medium"
                                    invalid={errors.size !== ''}
                                    onChange={(event) => setFormData({ ...formData, size: event.target.value })}
                                    data-cy="size-medium"
                                />
                                <Label htmlFor='medium'>Medium</Label>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="radio"
                                    name="size"
                                    value="Large"
                                    id="large"
                                    invalid={errors.size !== ''}
                                    onChange={(event) => setFormData({ ...formData, size: event.target.value })}
                                    data-cy="size-large"
                                />
                                <Label htmlFor='large'>Large</Label>
                            </FormGroup>
                            {errors.size && <FormFeedback data-cy="size-error">{errors.size}</FormFeedback>}
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
                                onChange={(event) => setFormData({ ...formData, dough: event.target.value })}
                                data-cy="dough-selection"
                            >
                                <option value='' hidden>Hamur Kalınlığı</option>
                                <option value='İnce Hamur'>İnce Hamur</option>
                                <option value='Orta Hamur'>Orta Hamur</option>
                                <option value='Kalın Hamur'>Kalın Hamur</option>
                                <option value='Dolgulu Hamur'>Dolgulu Hamur</option>
                                <option value='Ekşi Mayalı Hamur'>Ekşi Mayalı Hamur</option>
                                <option value='Glutenli Hamur'>Glutenli Hamur</option>
                            </Input>
                            {errors.dough && <FormFeedback data-cy="dough-error">{errors.dough}</FormFeedback>}
                        </FormGroup>
                    </div>

                    <div className='additional-ingredients'>
                        <strong>Ek Malzemeler</strong>
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
                                        data-cy={`ingredient-checkbox-${ingredient}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='selected-list'>
                            <Input
                                type="hidden"
                                invalid={errors.ingredients !== ''}
                                data-cy="ingredients-input"
                            />
                            <FormFeedback data-cy="ingredients-error">{errors.ingredients}</FormFeedback>
                            <strong>Seçilen Malzemeler: </strong>
                            {formData.ingredients.length > 0
                                ? formData.ingredients.join("- ")
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
                                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                type="text"
                                invalid={errors.name !== ''}
                                data-cy="name-input"
                            />
                            <FormFeedback data-cy="name-error">{errors.name}</FormFeedback>
                        </FormGroup>
                    </div>

                    <div className='order-note'>
                        <FormGroup>
                            <Label for="note">
                                <strong>Sipariş Notu</strong>
                            </Label>
                            <Input
                                id="note"
                                name="note"
                                value={formData.note}
                                placeholder="Siparişe eklemek istediğin bir not var mı?"
                                onChange={(event) => setFormData({ ...formData, note: event.target.value })}
                                type="textarea"
                                data-cy="note-input"
                            />
                        </FormGroup>
                    </div>


                    <div className='order-summary'>
                        <div className='orderAdd-button'>
                            <Button color="warning" onClick={() => handlePizzaCountChange("decrement")} data-cy="decrement-button">
                                -
                            </Button>
                            <div className='pizza-count'>{pizzaCount}</div>
                            <Button color="warning" onClick={() => handlePizzaCountChange("increment")} data-cy="increment-button">
                                +
                            </Button>
                        </div>
                        <div className='order-total'>
                            <h6>Sipariş Toplamı</h6>

                            <div className="choices">
                                <span>Seçimler:</span>
                                <span>{totalIngredientsPrice.toFixed(2)}₺</span>
                            </div>

                            <div className="total-price">
                                <span>Toplam:</span>
                                <span>{totalPrice.toFixed(2)}₺</span>
                            </div>

                            <Button color="warning" type="submit" disabled={!isValid} data-cy="submit-button">
                                SİPARİŞ VER
                            </Button>
                        </div>
                    </div>


                </Form>
            </div>
            <Footer />
        </>
    );
}

export default OrderPage;

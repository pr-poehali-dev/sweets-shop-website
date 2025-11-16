import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Cart, { CartItem } from '@/components/Cart';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const products = [
    {
      id: 1,
      name: 'Синие Леденцы',
      description: 'Освежающие леденцы с ягодным вкусом',
      price: 450,
      emoji: '💙',
      color: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      id: 2,
      name: 'Розовые Зефирки',
      description: 'Нежные облачка сладости',
      price: 680,
      emoji: '🌸',
      color: 'bg-gradient-to-br from-pink-400 to-pink-600'
    },
    {
      id: 3,
      name: 'Карамельки Радуга',
      description: 'Яркий микс вкусов',
      price: 520,
      emoji: '🌈',
      color: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      id: 4,
      name: 'Шоколадные Трюфели',
      description: 'Премиальный бельгийский шоколад',
      price: 890,
      emoji: '🍫',
      color: 'bg-gradient-to-br from-orange-500 to-amber-600'
    },
    {
      id: 5,
      name: 'Мармеладные Мишки',
      description: 'Фруктовые желейки для всей семьи',
      price: 380,
      emoji: '🐻',
      color: 'bg-gradient-to-br from-green-400 to-emerald-600'
    },
    {
      id: 6,
      name: 'Леденцы Ассорти',
      description: 'Классические вкусы детства',
      price: 420,
      emoji: '🍬',
      color: 'bg-gradient-to-br from-red-400 to-rose-600'
    },
    {
      id: 7,
      name: 'Дубайский Шоколад',
      description: 'Эксклюзивный шоколад с фисташковой начинкой',
      price: 5000,
      emoji: '🏜️',
      color: 'bg-gradient-to-br from-amber-600 to-yellow-700'
    },
    {
      id: 8,
      name: 'Конфеты Шипучка',
      description: 'Взрывные сладости с газировкой',
      price: 390,
      emoji: '✨',
      color: 'bg-gradient-to-br from-cyan-400 to-blue-500'
    }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product: typeof products[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === id ? { ...item, quantity } : item)
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍭</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Hiezenbierg
            </h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            {['home', 'about', 'products', 'delivery'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'about' && 'О магазине'}
                {section === 'products' && 'Продукты'}
                {section === 'delivery' && 'Доставка'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Cart
              items={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Сладкий рай для гурманов
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
                Откройте для себя мир изысканных конфет и леденцов ручной работы
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => scrollToSection('products')}
                >
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Смотреть каталог
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('about')}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-4xl md:text-6xl animate-scale-in">
              <span className="hover-scale cursor-pointer">🍬</span>
              <span className="hover-scale cursor-pointer">🍭</span>
              <span className="hover-scale cursor-pointer">🍫</span>
              <span className="hover-scale cursor-pointer">🍰</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-12">О магазине Hiezenbierg</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🏭</div>
                  <CardTitle>Ручная работа</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Каждая конфета создаётся вручную нашими мастерами-кондитерами с любовью и вниманием к деталям
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🌿</div>
                  <CardTitle>Натуральные ингредиенты</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Мы используем только природные красители и ароматизаторы, без искусственных добавок
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">🎨</div>
                  <CardTitle>Уникальные рецепты</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Наши рецепты разработаны эксклюзивно для Hiezenbierg и передаются из поколения в поколение
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">💝</div>
                  <CardTitle>Подарочная упаковка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Красивая упаковка в подарок к каждому заказу - ваши близкие будут в восторге
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-4">Наши продукты</h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выберите сладость по душе из нашей коллекции
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="hover-scale overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-40 ${product.color} flex items-center justify-center text-7xl`}>
                  {product.emoji}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{product.price}₽</span>
                    <span className="text-muted-foreground">за 100г</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-12">Доставка</h3>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Truck" size={32} className="text-primary" />
                    <CardTitle>Быстрая доставка по городу</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Доставим ваш заказ в течение 2-4 часов после оформления. Работаем ежедневно с 9:00 до 21:00.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Icon name="Check" size={20} />
                    <span>Бесплатно при заказе от 2000₽</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={32} className="text-primary" />
                    <CardTitle>Самовывоз из магазина</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    Приходите к нам по адресу: ул. Сладкая, 15
                  </p>
                  <p className="text-muted-foreground">
                    Режим работы: пн-пт 10:00-20:00, сб-вс 11:00-19:00
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Package" size={32} className="text-primary" />
                    <CardTitle>Доставка по России</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Отправляем заказы транспортными компаниями. Срок доставки 3-7 дней в зависимости от региона.
                    Стоимость рассчитывается индивидуально.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍭</span>
                <h4 className="text-xl font-bold">Hiezenbierg</h4>
              </div>
              <p className="text-muted-foreground">
                Магазин изысканных сладостей ручной работы
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@hiezenbierg.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>ул. Сладкая, 15</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="hover-scale" asChild>
                  <a href="https://t.me/lunikonus" target="_blank" rel="noopener noreferrer">
                    <Icon name="Send" size={20} />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="hover-scale">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="hover-scale">
                  <Icon name="Facebook" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>© 2024 Hiezenbierg. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
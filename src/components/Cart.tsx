import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onClear }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="ShoppingBag" size={24} />
            Корзина
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? 'Ваша корзина пуста' : `${totalItems} ${totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'} в корзине`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-muted-foreground">Добавьте сладости в корзину</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
                  <div className="text-4xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price}₽ за 100г</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onRemove(item.id)}
                  >
                    <Icon name="Trash2" size={16} className="text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-4 mt-8">
            <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
              <span>Итого:</span>
              <span className="text-2xl text-primary">{totalPrice.toLocaleString('ru-RU')}₽</span>
            </div>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClear}
              >
                Очистить
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                onClick={() => {
                  alert('Спасибо за заказ! Скоро с вами свяжется наш менеджер.');
                  setIsOpen(false);
                }}
              >
                Оформить заказ
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

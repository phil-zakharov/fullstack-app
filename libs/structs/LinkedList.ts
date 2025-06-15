class LinkedListNode<T> {
  value: T;
  next: Nullable<LinkedListNode<T>> = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  left: Nullable<LinkedListNode<T>> = null;
  right: Nullable<LinkedListNode<T>> = null;

  /** Добавить элемент в конец списка. */
  append(value: T) {
    const node = this.#createNode(value);

    if (this.isEmpty()) {
      this.left = node;
      this.right = node;
    } else {
      this.right!.next = node;
      this.right = node;
    }
  }

  /** Добавить элемент в начало списка. */
  prepend(value: T) {
    const node = this.#createNode(value);

    if (this.isEmpty()) {
      this.left = node;
      this.right = node;
    } else {
      node.next = this.left;
      this.left = node;
    }
  }

  /** Удалить первое вхождение по значению. */
  remove(value: T) {
    let cursor = this.left;

    if (cursor?.value === value) {
      this.left = cursor.next;
      return;
    }

    while (cursor) {
      const next = cursor.next;
      if (next && next.value === value) {
        cursor.next = next.next;
        return;
      }
      cursor = cursor.next;
    }
  }

  /** Удалить все вхождения по значению. */
  removeAll(value: T) {
    let cursor = this.left;

    if (cursor?.value === value) {
      this.left = cursor.next;
    }

    while (cursor) {
      const next = cursor.next;
      if (next && next.value === value) {
        cursor.next = next.next;
      } else {
        cursor = cursor.next;
      }
    }
  }

  /** Проверить наличие значения в списке */
  contains(argValue: T) {
    for (const value of this) {
      if (value === argValue) {
        return true;
      }
    }

    return false;
  }

  /** Вернуть количество элементов в списке. */
  get size() {
    return [...this].length;
  }

  /** Проверить, пустой ли список. */
  isEmpty() {
    return !this.left;
  }

  /** Преобразовать список в обычный массив. */
  toArray() {
    return [...this];
  }

  /** Пройтись по каждому элементу с функцией обратного вызова. */
  forEach(callback: (val: T) => void) {
    for (const value of this) {
      callback(value);
    }
  }

  #createNode(value: T) {
    return new LinkedListNode(value);
  }

  [Symbol.iterator](): Iterator<T> {
    let cursor = this.left;
    return {
      next(): IteratorResult<T> {
        if (!cursor) {
          return { done: true, value: undefined };
        }

        const { value } = cursor;
        cursor = cursor.next;
        return { done: false, value };
      },
    };
  }
}

export function createList() {
  return new LinkedList();
}

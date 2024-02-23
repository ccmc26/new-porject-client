'use client';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createBook } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Books } from '@/app/lib/definitions';

interface BooksFormProps {
  books: Books[];
}

export default function BooksForm({ books }: BooksFormProps) {
  // Aquí va la lógica del formulario para crear los libros

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBook, initialState);

  return <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Titulo libros
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                placeholder="Introduzca título"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Autor del libro
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="author"
                name="author"
                type="string"
                placeholder="Introduzca al autor"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Fecha de publicación
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="publication_year"
                name="publication_year"
                type="number"
                placeholder="Introduzca año"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Genero
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="genre"
                name="genre"
                type="genre"
                placeholder="Indique el genero"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/books"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Book</Button>
      </div>
    </form>
  // );
}
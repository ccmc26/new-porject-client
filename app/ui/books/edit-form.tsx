'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
// import { updateInvoice } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { UpdateBook } from '@/app/lib/actions';

import { Books } from '@/app/lib/definitions';

interface BookFormProps {
  book: Books;
}

export default function BookForm({ book }: BookFormProps) {
  const initialState = { message: null, errors: {} };
  const updateBookWithId = UpdateBook.bind(null, book.id);
  const [state, dispatch] = useFormState(updateBookWithId, initialState);

  return <form action={dispatch}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Titulo libros
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                placeholder=''
                defaultValue={book.title}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="mb-2 block text-sm font-medium">
            Autor del libro
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="author"
                name="author"
                type="string"
                placeholder=""
                defaultValue={book.author}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="publication_year" className="mb-2 block text-sm font-medium">
            Fecha de publicación
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="publication_year"
                name="publication_year"
                type="number"
                placeholder=""
                defaultValue={book.publication_year}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="mb-2 block text-sm font-medium">
            Genero
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="genre"
                name="genre"
                type="genre"
                placeholder=""
                defaultValue={book.genre}
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
        <Button type="submit">Edit Book</Button>
      </div>
    </form>
}

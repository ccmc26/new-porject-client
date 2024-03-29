'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
// import { UpdateBook } from '../ui/books/buttons';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const FormSchemaBook = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    publication_year: z.number(),
    genre: z.string(),
});

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
   
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
  ) {

    const UpdateInvoice = FormSchema.omit({ id: true });
    const validatedFields = UpdateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }
   
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  const CreateBook = FormSchemaBook.omit({id: true});

  export async function createBook(prevState: State, formData: FormData) {
    const validatedFields = CreateBook.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        publication_year: formData.get('publication_year'),
        genre: formData.get('genre'),
    })

    if(!validatedFields.success){
        return {
            // errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Books.',
        };
    }

    const { title, author, publication_year, genre} = validatedFields.data;
    try{
        await sql`
            INSERT INTO books (title,author,publication_year,genre)
            VALUES(${title},${author},${publication_year},${genre})
        `;
    }catch(error){
        return {
            message: 'Database Error: Failed to Create Book.',
        };
    }
    revalidatePath('/dashboard/books');
    redirect('/dashboard/books');
  }


export async function UpdateBook(
    id: string,
    prevState: State,
    formData: FormData,
) {

    const updateBook = FormSchemaBook.omit({ id: true });
    const validatedFields = updateBook.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        publication_year: formData.get('publication_year'),
        genre: formData.get('genre'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }
   
    const { title, author, publication_year, genre } = validatedFields.data;

   
    try {
      await sql`
        UPDATE books
        SET title = ${title}, author = ${author}, publication_year = ${publication_year}, genre = ${genre}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Books.' };
    }
   
    revalidatePath('/dashboard/books');
    redirect('/dashboard/books');
  }

  export async function deleteBook(id: string) {
    try {
        await sql`DELETE FROM books WHERE id = ${id}`;
        revalidatePath('/dashboard/books');
        return { message: 'Deleted Book.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Book.' };
    }
}


'use client'

import { PageBack } from '@/components/pageBack';
import { FormContact } from './component/form';

export default function Contact() {
  return (
    <section className="w-full">
      <div className="w-full h-72 flex flex-col justify-center items-center bg-contact_bg bg-no-repeat bg-cover">
        <h2 className="font-serif text-5xl text-zinc-100 iphone_SE:w-full text-center iphone_SE:text-3xl iphone_XR:text-3xl">
          Central de contato RealState
        </h2>
      </div>
      <div className='ml-4'><PageBack /></div>
      <FormContact />
    </section>
  );
}

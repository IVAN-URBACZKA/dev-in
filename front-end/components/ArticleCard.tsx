import React from 'react';

interface CardBasicProps {
  id: number,
  name: string,
  slug: string,
  content: string,
  createdAt: string,
  onDelete: (id: number) => void, 
  editPath: string,
  isUserAuthenticated: boolean
}


function TruncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export default function CardBasicExample({id, name, slug, content, createdAt, onDelete, editPath, isUserAuthenticated}: CardBasicProps): JSX.Element {
  const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  const maxLength = 100; 
  const truncatedText = TruncateText(content, maxLength);

  return (
      <div className="mx-auto mt-5 mb-8 block max-w-md p-8 rounded-xl shadow-sm white:bg-gray-800 grey:border-gray-700 border border-gray-200 md:max-w-3xl">
          <div className="space-y-6">
            <h5 className="text-2xl font-semibold leading-tight text-gray-900 dark:text-white">
            {name}
            </h5>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {truncatedText}
            </p>
            <em className="text-sm text-gray-500">{formattedDate}</em> <br />
          </div>
          {isUserAuthenticated && (
          <div className='actions-container mt-4'>
            <a href={editPath} className="mr-4 text-xl hover:bg-purple-500">Edit</a>
            <a href="#" className="text-xl hover:bg-purple-900" onClick={(e) => { e.preventDefault(); onDelete(id); }}>Delete</a>
          </div>
         )}
      </div>
  );
}

import React, { useState } from 'react';
import { useTransition } from 'react';
import { Account, EventGetByEventId } from '@/lib/schema';

const EventDetails = (props: {
  user: Account;
  organizerName: string | undefined;
  events: EventGetByEventId[];
}) => {
  const eventsArray = [...props.events];
  const [page, setpage] = useState('eventdetails');
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <ul>
          <li>
            <button onClick={() => setpage('reviews')}>Reviews</button>
          </li>
          <li>
            <button onClick={() => setpage('events')}>Events</button>
          </li>
          <li>
            <button onClick={() => setpage('details')}>Details</button>
          </li>
        </ul>
      </nav>

      {/* active page */}
      {(() => {
        switch (page) {
          case 'reviews':
            return (
              <>
                {/* Reviews page */}
                <div className="flex flex-col">
                  <div className="mb-3 text-4xl">Reviews</div>
                  <hr className="mb-3" />
                  <div className="my-1 flex flex-col">{/* reviews*/}</div>
                </div>
              </>
            );
          case 'events':
            return (
              <>
                {/* Events page */}
                <div className="flex flex-col">
                  <div className="mb-3 text-4xl">Events</div>
                  <hr className="mb-3" />
                  <div className="my-1 flex flex-col">{/* Add events content here */}</div>
                </div>
              </>
            );
          case 'details':
            return (
              <>
                {/* Details page */}
                <div className="flex flex-col">
                  <div className="mb-3 text-4xl">Details</div>
                  <hr className="mb-3" />
                  <div className="my-1 flex flex-col">{/* details */}</div>
                </div>
              </>
            );
          
        }
      })()}
    </>
  );
};


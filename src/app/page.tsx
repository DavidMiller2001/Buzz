import { db } from "~/server/db";

export default async function HomePage() {
  const messages = await db.query.messages.findMany();

  return (
    <main className="">
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

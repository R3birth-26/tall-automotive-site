import { DraftNotice } from "@/components/DraftNotice";
import { business } from "@/lib/site";

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-neutral-900">Our Story</h1>

      <DraftNotice>
        Placeholder copy — swap in {business.name}&apos;s real history, founding story, and any
        milestones before this goes live.
      </DraftNotice>

      <div className="prose prose-neutral max-w-none space-y-4 text-neutral-700">
        <p>
          {business.name} has been a fixture in Hampstead, NH, serving drivers and property
          owners with honest, reliable work. What started as a general auto and truck repair shop
          has grown into a full-service operation trusted by the community.
        </p>
        <p>
          Today, {business.name} specializes in expert repair — and services everything that
          comes through the door — while offering a focused sales lineup of trucks, vans, and
          Bad Boy Mowers equipment: zero-turn mowers, tractors, and handheld equipment, backed by
          the same service standards our customers have always counted on.
        </p>
        <p>
          Every price we quote is straightforward: a cash price and a finance price, side by
          side, so you always know where you stand.
        </p>
      </div>
    </div>
  );
}

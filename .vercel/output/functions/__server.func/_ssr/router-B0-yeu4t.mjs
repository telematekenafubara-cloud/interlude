import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as redirect, _ as createRootRoute, b as require_jsx_runtime, d as HeadContent, g as createFileRoute, h as lazyRouteComponent, m as Outlet, p as createRouter, u as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B0-yeu4t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/** Extra Holds in the network playlist. Original brands — not real companies. */
var HOLD_CATALOG = [
	{
		id: "lumen-ward",
		name: "Lumen Ward",
		category: "Diagnostics",
		tagline: "Bloodwork by morning.",
		body: "A quiet draw. Results before the second coffee.",
		cta: "Book a draw",
		still: "/ads/lumen.jpg",
		video: "/ads/lumen-ward.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "What to run",
			options: [
				{
					id: "full",
					label: "Full panel",
					line: "The one your GP actually wanted.",
					wash: "rgba(180, 210, 200, 0.28)"
				},
				{
					id: "iron",
					label: "Iron",
					line: "Why the stairs feel longer.",
					wash: "rgba(140, 60, 50, 0.3)"
				},
				{
					id: "sugar",
					label: "Sugar",
					line: "A number, not a lecture.",
					wash: "rgba(210, 170, 80, 0.28)"
				},
				{
					id: "thyroid",
					label: "Thyroid",
					line: "The quiet one people skip.",
					wash: "rgba(80, 110, 140, 0.32)"
				}
			]
		}
	},
	{
		id: "halo-cover",
		name: "Halo Cover",
		category: "Health cover",
		tagline: "The bill should not be the diagnosis.",
		body: "Hospital cover written in sentences a family can finish.",
		cta: "See plans",
		still: "/ads/halo-cover-hold.jpg",
		video: "/ads/halo-cover.mp4",
		holdMs: 8e3
	},
	{
		id: "quiet-room",
		name: "Quiet Room",
		category: "Mental health",
		tagline: "Forty minutes. A closed door.",
		body: "Talk therapy that starts this week, not next quarter.",
		cta: "Start tonight",
		still: "/ads/quietroom.jpg",
		video: "/ads/quiet-room.mp4",
		holdMs: 8e3
	},
	{
		id: "rivermist",
		name: "Rivermist",
		category: "Pharmacy",
		tagline: "Filled before you leave the chair.",
		body: "The script, the brand you asked for, a chemist who stays open.",
		cta: "Find a counter",
		still: "/ads/rivermist.jpg",
		video: "/ads/rivermist.mp4",
		holdMs: 8e3
	},
	{
		id: "pulse-line",
		name: "Pulse Line",
		category: "Telehealth",
		tagline: "A doctor in the language you think in.",
		body: "Video consults that do not begin with ‘can you hear me?’",
		cta: "Talk to a GP",
		still: "/ads/pulse-line-hold.jpg",
		video: "/ads/pulse-line.mp4",
		holdMs: 8e3
	},
	{
		id: "lantern-prep",
		name: "Lantern Prep",
		category: "Exam prep",
		tagline: "The paper is not a surprise.",
		body: "Past questions, a tutor who stays, a lamp that lasts the night.",
		cta: "Open a week",
		still: "/ads/lantern.jpg",
		video: "/ads/lantern-prep.mp4",
		holdMs: 8e3
	},
	{
		id: "amina-hall",
		name: "Amina Hall",
		category: "Lectures",
		tagline: "One subject. A teacher who stays.",
		body: "Recorded once. Explained until it sits.",
		cta: "Enrol",
		still: "/ads/amina.jpg",
		video: "/ads/amina-hall.mp4",
		holdMs: 8e3
	},
	{
		id: "ink-year",
		name: "Ink Year",
		category: "School",
		tagline: "A year that writes back.",
		body: "Small classes. Marked work that arrives before you forget the question.",
		cta: "Apply",
		still: "/ads/ink-year-hold.jpg",
		video: "/ads/ink-year.mp4",
		holdMs: 8e3
	},
	{
		id: "kasa-code",
		name: "Kasa Code",
		category: "Skills",
		tagline: "Ship something before the certificate.",
		body: "Twelve weeks. A product on a phone, not a slide.",
		cta: "Start a cohort",
		still: "/ads/threadcast.jpg",
		video: "/ads/kasa-code.mp4",
		holdMs: 8e3
	},
	{
		id: "threadcast",
		name: "Threadcast",
		category: "Cloud",
		tagline: "Your model, close to the people who wait on it.",
		body: "Inference in the city it serves. Less spinner. More answer.",
		cta: "Read the docs",
		still: "/ads/threadcast-hold.jpg",
		video: "/ads/threadcast.mp4",
		holdMs: 8e3
	},
	{
		id: "glassfield",
		name: "Glassfield",
		category: "Devices",
		tagline: "A phone that lasts a harmattan.",
		body: "Dust, heat, a battery that still has Thursday in it.",
		cta: "See the handset",
		still: "/ads/glassfield.jpg",
		video: "/ads/glassfield.mp4",
		holdMs: 8e3
	},
	{
		id: "redoubt",
		name: "Redoubt",
		category: "Security",
		tagline: "Lock the door you forgot you left open.",
		body: "One scan. The accounts still using last year’s password.",
		cta: "Run a scan",
		still: "/ads/redoubt.jpg",
		video: "/ads/redoubt.mp4",
		holdMs: 8e3
	},
	{
		id: "yaba-chip",
		name: "Yaba Chip",
		category: "Semiconductors",
		tagline: "Designed here. Soldered for this heat.",
		body: "Boards that do not quit at 38 degrees.",
		cta: "Meet the board",
		still: "/ads/yaba-chip-hold.jpg",
		video: "/ads/yaba-chip.mp4",
		holdMs: 8e3
	},
	{
		id: "lowcut",
		name: "Lowcut",
		category: "Listening",
		tagline: "The mix, not the algorithm.",
		body: "A listening app that still has albums.",
		cta: "Play the room",
		still: "/ads/harmattan.jpg",
		video: "/ads/lowcut.mp4",
		holdMs: 8e3
	},
	{
		id: "harmattan-records",
		name: "Harmattan Records",
		category: "Label",
		tagline: "First press. No skip on the A-side.",
		body: "Vinyl and files from rooms that still have a soundcheck.",
		cta: "Hear the EP",
		still: "/ads/harmattan-records-hold.jpg",
		video: "/ads/harmattan-records.mp4",
		holdMs: 8e3
	},
	{
		id: "night-yard",
		name: "Night Yard",
		category: "Live",
		tagline: "A yard that still has a soundcheck.",
		body: "Tables in the dust. A set that starts when it starts.",
		cta: "Get a table",
		still: "/ads/nightyard.jpg",
		video: "/ads/night-yard.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "Which door",
			options: [
				{
					id: "front",
					label: "Yard",
					line: "Laterite, lights, the first beer.",
					wash: "rgba(160, 90, 40, 0.32)"
				},
				{
					id: "back",
					label: "Back room",
					line: "The second set. Fewer phones.",
					wash: "rgba(40, 28, 24, 0.42)"
				},
				{
					id: "roof",
					label: "Roof",
					line: "The city, a little quieter.",
					wash: "rgba(70, 80, 110, 0.34)"
				},
				{
					id: "late",
					label: "After",
					line: "When the generator is the kick.",
					wash: "rgba(30, 30, 28, 0.45)"
				}
			]
		}
	},
	{
		id: "second-voice",
		name: "Second Voice",
		category: "Artists",
		tagline: "The feature you actually wanted.",
		body: "A roster that still tours the rooms that built it.",
		cta: "Follow the drop",
		still: "/ads/second-voice-hold.jpg",
		video: "/ads/second-voice.mp4",
		holdMs: 8e3
	},
	{
		id: "reelhouse",
		name: "Reelhouse",
		category: "Cinema",
		tagline: "One screen. Then the title.",
		body: "A single-screen house. Seats that still face forward.",
		cta: "Book a seat",
		still: "/ads/reelhouse.jpg",
		video: "/ads/reelhouse.mp4",
		holdMs: 8e3
	},
	{
		id: "afterlight",
		name: "Afterlight",
		category: "Film",
		tagline: "Films that end. Not a feed.",
		body: "A catalogue with last pages. Watch one, go to bed.",
		cta: "Start a title",
		still: "/ads/afterlight-hold.jpg",
		video: "/ads/afterlight.mp4",
		holdMs: 8e3
	},
	{
		id: "harmattan-fest",
		name: "Harmattan Fest",
		category: "Festival",
		tagline: "Five days. No red carpet.",
		body: "Shorts, features, a queue that still talks after.",
		cta: "See the slate",
		still: "/ads/harmattan-fest-hold.jpg",
		video: "/ads/harmattan-fest.mp4",
		holdMs: 8e3
	},
	{
		id: "mangrove-homes",
		name: "Mangrove Homes",
		category: "Residences",
		tagline: "A house that knows the water.",
		body: "Stilt, timber, a lagoon that is the garden.",
		cta: "View a plot",
		still: "/ads/mangrove.jpg",
		video: "/ads/mangrove-homes.mp4",
		holdMs: 8e3
	},
	{
		id: "ikoyi-light",
		name: "Ikoyi Light",
		category: "Apartments",
		tagline: "High enough to see the lagoon work.",
		body: "A floor, a view, a rent that is written down.",
		cta: "Book a viewing",
		still: "/ads/ikoyi.jpg",
		video: "/ads/ikoyi-light.mp4",
		holdMs: 8e3
	},
	{
		id: "laterite-title",
		name: "Laterite",
		category: "Land",
		tagline: "Title first. Then the fence.",
		body: "Searched, surveyed, a deed you can hold.",
		cta: "Check a title",
		still: "/ads/laterite-land.jpg",
		video: "/ads/laterite-title.mp4",
		holdMs: 8e3
	},
	{
		id: "tenant-hour",
		name: "Tenant Hour",
		category: "Rentals",
		tagline: "The inspection is twenty minutes. Honest.",
		body: "Flats with photos of the actual wall.",
		cta: "See listings",
		still: "/ads/tenant-hour-hold.jpg",
		video: "/ads/tenant-hour.mp4",
		holdMs: 8e3
	},
	{
		id: "threadline",
		name: "Threadline",
		category: "Social",
		tagline: "Groups, not a stage.",
		body: "Rooms of people you would sit with. Phones face down.",
		cta: "Join a room",
		still: "/ads/threadline.jpg",
		video: "/ads/threadline.mp4",
		holdMs: 8e3
	},
	{
		id: "short-yard",
		name: "Short Yard",
		category: "Short video",
		tagline: "Fifteen seconds that belong to the maker.",
		body: "Cuts you can keep. Not a borrowed dance.",
		cta: "Post one",
		still: "/ads/short-yard-hold.jpg",
		video: "/ads/short-yard.mp4",
		holdMs: 8e3
	},
	{
		id: "circle-keep",
		name: "Circle Keep",
		category: "Community",
		tagline: "Twelve people. That’s the product.",
		body: "A small net. Dues. No strangers in the feed.",
		cta: "Open a circle",
		still: "/ads/circle-keep-hold.jpg",
		video: "/ads/circle-keep.mp4",
		holdMs: 8e3
	},
	{
		id: "cedar-book",
		name: "Cedar Book",
		category: "Funds",
		tagline: "A fund that writes in sentences.",
		body: "Holdings you can read. Fees on the first page.",
		cta: "Read the factsheet",
		still: "/ads/longrain.jpg",
		video: "/ads/cedar-book.mp4",
		holdMs: 8e3
	},
	{
		id: "long-rain",
		name: "Long Rain",
		category: "Pension",
		tagline: "Money that outlives the job.",
		body: "A pot that still has a letter with your name.",
		cta: "See the pot",
		still: "/ads/long-rain-hold.jpg",
		video: "/ads/long-rain.mp4",
		holdMs: 8e3
	},
	{
		id: "west-seed",
		name: "West Seed",
		category: "Venture",
		tagline: "Cheques for shops that already sell.",
		body: "First money after the till is real.",
		cta: "Pitch a round",
		still: "/ads/west-seed-hold.jpg",
		video: "/ads/west-seed.mp4",
		holdMs: 8e3
	},
	{
		id: "quiet-desk",
		name: "Quiet Desk",
		category: "Advisory",
		tagline: "Advice that fits on one page.",
		body: "An hour. A number. No deck with forty charts.",
		cta: "Book an hour",
		still: "/ads/current.jpg",
		video: "/ads/quiet-desk.mp4",
		holdMs: 8e3
	},
	{
		id: "current-house",
		name: "Current House",
		category: "Banking",
		tagline: "A current account that stays current.",
		body: "In, out, a balance you can say aloud.",
		cta: "Open one",
		still: "/ads/current-house-hold.jpg",
		video: "/ads/current-house.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "Open which book",
			options: [
				{
					id: "current",
					label: "Current",
					line: "The everyday till.",
					wash: "rgba(40, 70, 56, 0.38)"
				},
				{
					id: "save",
					label: "Save",
					line: "A pot with a lock you chose.",
					wash: "rgba(180, 150, 80, 0.28)"
				},
				{
					id: "usd",
					label: "Dollar",
					line: "For the invoice that isn’t naira.",
					wash: "rgba(70, 90, 70, 0.34)"
				},
				{
					id: "sme",
					label: "Shop",
					line: "Two signatories. One stamp.",
					wash: "rgba(90, 60, 40, 0.32)"
				}
			]
		}
	},
	{
		id: "ledger-co",
		name: "Ledger & Co",
		category: "Cards",
		tagline: "One card. The rest is noise.",
		body: "Spend, a statement, a number that matches the till.",
		cta: "Request a card",
		still: "/ads/ledger-co-hold.jpg",
		video: "/ads/ledger-co.mp4",
		holdMs: 8e3
	},
	{
		id: "stall-credit",
		name: "Stall Credit",
		category: "SME",
		tagline: "Stock before the weekend market.",
		body: "A line that arrives while the goods are still on the road.",
		cta: "Get a line",
		still: "/ads/eveningpot.jpg",
		video: "/ads/stall-credit.mp4",
		holdMs: 8e3
	},
	{
		id: "crossing",
		name: "Crossing",
		category: "Diaspora",
		tagline: "Send it like you walked it over.",
		body: "A transfer that lands before the call ends.",
		cta: "Send today",
		still: "/ads/lagoonramp.jpg",
		video: "/ads/crossing.mp4",
		holdMs: 8e3
	},
	{
		id: "west-exchange",
		name: "West Exchange",
		category: "Markets",
		tagline: "The tape, without the shout.",
		body: "A board you can read. Hours that match this city.",
		cta: "Open a board",
		still: "/ads/nightmarket.jpg",
		video: "/ads/west-exchange.mp4",
		holdMs: 8e3
	},
	{
		id: "thin-spread",
		name: "Thin Spread",
		category: "Brokerage",
		tagline: "A kobo that stays a kobo.",
		body: "Orders that fill. Fees you can find.",
		cta: "Place a bid",
		still: "/ads/thin-spread-hold.jpg",
		video: "/ads/thin-spread.mp4",
		holdMs: 8e3
	},
	{
		id: "footnote",
		name: "Footnote",
		category: "Research",
		tagline: "The filing, not the rumour.",
		body: "Notes with sources. No rocket on the cover.",
		cta: "Read a note",
		still: "/ads/footnote-hold.jpg",
		video: "/ads/footnote.mp4",
		holdMs: 8e3
	},
	{
		id: "night-market",
		name: "Night Market",
		category: "Trading",
		tagline: "Hours when London is asleep.",
		body: "A book that stays open after the last bus.",
		cta: "Open a book",
		still: "/ads/night-market-hold.jpg",
		video: "/ads/night-market.mp4",
		holdMs: 8e3
	},
	{
		id: "grain-wire",
		name: "Grain Wire",
		category: "Commodities",
		tagline: "Cocoa, cashew, the price you were promised.",
		body: "Contracts that still name the port.",
		cta: "See contracts",
		still: "/ads/grain-wire-hold.jpg",
		video: "/ads/grain-wire.mp4",
		holdMs: 8e3
	},
	{
		id: "copy-desk",
		name: "Copy Desk",
		category: "Copy trade",
		tagline: "Follow a book, not a personality.",
		body: "A desk you can audit. Size you can cap.",
		cta: "Mirror a desk",
		still: "/ads/copy-desk-hold.jpg",
		video: "/ads/copy-desk.mp4",
		holdMs: 8e3
	},
	{
		id: "cedar-vault",
		name: "Cedar Vault",
		category: "Custody",
		tagline: "Keys you can name.",
		body: "Cold storage with a door, a log, a person.",
		cta: "Open a vault",
		still: "/ads/cedarvault.jpg",
		video: "/ads/cedar-vault.mp4",
		holdMs: 8e3
	},
	{
		id: "lagoon-ramp",
		name: "Lagoon Ramp",
		category: "On-ramp",
		tagline: "Naira in. Coin out. No theatre.",
		body: "A conversion you can explain to your father.",
		cta: "Convert",
		still: "/ads/lagoon-ramp-hold.jpg",
		video: "/ads/lagoon-ramp.mp4",
		holdMs: 8e3
	},
	{
		id: "quiet-chain",
		name: "Quiet Chain",
		category: "Wallet",
		tagline: "A wallet that does not ping.",
		body: "Send, receive, a seed you wrote down once.",
		cta: "Get the app",
		still: "/ads/quiet-chain-hold.jpg",
		video: "/ads/quiet-chain.mp4",
		holdMs: 8e3
	},
	{
		id: "block-hour",
		name: "Block Hour",
		category: "Exchange",
		tagline: "One pair. A spread you can see.",
		body: "A market with a clock, not a carnival.",
		cta: "Trade a pair",
		still: "/ads/block-hour-hold.jpg",
		video: "/ads/block-hour.mp4",
		holdMs: 8e3
	},
	{
		id: "dry-season",
		name: "Dry Season",
		category: "Data",
		tagline: "Data that lasts the month it sold.",
		body: "A plan with a number that does not evaporate on day nine.",
		cta: "Pick a plan",
		still: "/ads/dryseason.jpg",
		video: "/ads/dry-season.mp4",
		holdMs: 8e3
	},
	{
		id: "call-home",
		name: "Call Home",
		category: "Voice",
		tagline: "The call that still sounds like a room.",
		body: "Voice that does not fall apart at the greeting.",
		cta: "Dial",
		still: "/ads/call-home-hold.jpg",
		video: "/ads/call-home.mp4",
		holdMs: 8e3
	},
	{
		id: "roof-noon",
		name: "Roof Noon",
		category: "Solar",
		tagline: "The bill, cut at the roof.",
		body: "Panels, an inverter, a survey that shows the hours.",
		cta: "Get a survey",
		still: "/ads/roofnoon.jpg",
		video: "/ads/roof-noon.mp4",
		holdMs: 8e3
	},
	{
		id: "last-light",
		name: "Last Light",
		category: "Power",
		tagline: "Inverter hours you can count on.",
		body: "A pack that still has ten o’clock in it.",
		cta: "See a pack",
		still: "/ads/last-light-hold.jpg",
		video: "/ads/last-light.mp4",
		holdMs: 8e3
	},
	{
		id: "evening-pot",
		name: "Evening Pot",
		category: "Food",
		tagline: "The pot that still has a name.",
		body: "One soup. A rider who finds the gate.",
		cta: "Order tonight",
		still: "/ads/evening-pot-hold.jpg",
		video: "/ads/evening-pot.mp4",
		holdMs: 8e3
	},
	{
		id: "grain-loaf",
		name: "Grain Loaf",
		category: "Bakery",
		tagline: "Bread before the city wakes.",
		body: "Racks at four. Still warm at seven.",
		cta: "Find a shop",
		still: "/ads/grainloaf.jpg",
		video: "/ads/grain-loaf.mp4",
		holdMs: 8e3
	},
	{
		id: "laterite-pitch",
		name: "Laterite Pitch",
		category: "Football",
		tagline: "Boots, not a brand deal.",
		body: "A Saturday that still has a kick-off.",
		cta: "Get a ticket",
		still: "/ads/laterite.jpg",
		video: "/ads/laterite-pitch.mp4",
		holdMs: 8e3
	},
	{
		id: "dawn-split",
		name: "Dawn Split",
		category: "Fitness",
		tagline: "The 5:40 that actually happens.",
		body: "A pack, a coach, a floor that is already lit.",
		cta: "Join a pack",
		still: "/ads/dawnsplit.jpg",
		video: "/ads/dawn-split.mp4",
		holdMs: 8e3
	},
	{
		id: "mile-okada",
		name: "Mile",
		category: "Delivery",
		tagline: "There before the group chat argues.",
		body: "A parcel, a helmet, a gate that opens.",
		cta: "Send a parcel",
		still: "/ads/mile.jpg",
		video: "/ads/mile-okada.mp4",
		holdMs: 8e3
	},
	{
		id: "harmattan-cover",
		name: "Harmattan Cover",
		category: "Insurance",
		tagline: "Cover for the season that takes roofs.",
		body: "A claim that starts with a photo, not a queue.",
		cta: "Get a quote",
		still: "/ads/harmattancover.jpg",
		video: "/ads/harmattan-cover.mp4",
		holdMs: 8e3
	},
	{
		id: "ward-dawn",
		name: "Ward Dawn",
		category: "Hospital",
		tagline: "A ward that is already awake.",
		body: "Admissions before the traffic. A nurse who knows the file.",
		cta: "Book a bed",
		still: "/ads/warddawn.jpg",
		video: "/ads/ward-dawn.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "Which door",
			options: [
				{
					id: "gp",
					label: "GP",
					line: "The list you meant to make.",
					wash: "rgba(160, 190, 170, 0.28)"
				},
				{
					id: "lab",
					label: "Lab",
					line: "Drawn before the second coffee.",
					wash: "rgba(180, 210, 200, 0.28)"
				},
				{
					id: "scan",
					label: "Scan",
					line: "Same morning. Same floor.",
					wash: "rgba(80, 110, 140, 0.32)"
				},
				{
					id: "ward",
					label: "Ward",
					line: "A bed with a name on it.",
					wash: "rgba(40, 70, 56, 0.38)"
				}
			]
		}
	},
	{
		id: "first-light",
		name: "First Light",
		category: "Maternity",
		tagline: "The first hour, not the first bill.",
		body: "A room, a midwife, a window that faces morning.",
		cta: "Tour a room",
		still: "/ads/firstlight.jpg",
		video: "/ads/first-light.mp4",
		holdMs: 8e3
	},
	{
		id: "ivory-chair",
		name: "Ivory Chair",
		category: "Dental",
		tagline: "The chair is forty minutes. Honest.",
		body: "A clean, a filling, a number you can say out loud.",
		cta: "Book a chair",
		still: "/ads/ivory-chair-hold.jpg",
		video: "/ads/ivory-chair.mp4",
		holdMs: 8e3
	},
	{
		id: "shore-shot",
		name: "Shore Shot",
		category: "Travel clinic",
		tagline: "The yellow card, before the gate.",
		body: "Jabs, a stamp, a nurse who has seen the form.",
		cta: "Get the card",
		still: "/ads/shore-shot-hold.jpg",
		video: "/ads/shore-shot.mp4",
		holdMs: 8e3
	},
	{
		id: "hall-desk",
		name: "Hall Desk",
		category: "University",
		tagline: "A seat that still faces the board.",
		body: "Lectures that start. Notes that arrive. A hall with a door.",
		cta: "Take a seat",
		still: "/ads/halldesk.jpg",
		video: "/ads/hall-desk.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "Which faculty",
			options: [
				{
					id: "law",
					label: "Law",
					line: "Cases, not slogans.",
					wash: "rgba(70, 50, 40, 0.36)"
				},
				{
					id: "med",
					label: "Medicine",
					line: "The ward after the hall.",
					wash: "rgba(160, 190, 170, 0.28)"
				},
				{
					id: "eng",
					label: "Engineering",
					line: "A workshop that is open.",
					wash: "rgba(80, 90, 100, 0.32)"
				},
				{
					id: "arts",
					label: "Arts",
					line: "A library that still has hours.",
					wash: "rgba(180, 150, 80, 0.28)"
				}
			]
		}
	},
	{
		id: "second-tongue",
		name: "Second Tongue",
		category: "Language",
		tagline: "The language you need at the counter.",
		body: "French, Hausa, Yoruba, a tutor who stays the hour.",
		cta: "Book a tutor",
		still: "/ads/second-tongue-hold.jpg",
		video: "/ads/second-tongue.mp4",
		holdMs: 8e3
	},
	{
		id: "saturday-board",
		name: "Saturday Board",
		category: "Children",
		tagline: "A Saturday that still has a chalkboard.",
		body: "Small tables. Marked work. Home before the match.",
		cta: "Enrol a child",
		still: "/ads/saturday-board-hold.jpg",
		video: "/ads/saturday-board.mp4",
		holdMs: 8e3
	},
	{
		id: "merit-letter",
		name: "Merit Letter",
		category: "Scholarships",
		tagline: "The letter that pays the year.",
		body: "Forms that close. A committee that writes back.",
		cta: "Apply this round",
		still: "/ads/merit-letter-hold.jpg",
		video: "/ads/merit-letter.mp4",
		holdMs: 8e3
	},
	{
		id: "map-quiet",
		name: "Map Quiet",
		category: "Maps",
		tagline: "The road that is actually open.",
		body: "Traffic, gates, a pin that does not lie.",
		cta: "Open the map",
		still: "/ads/map-quiet-hold.jpg",
		video: "/ads/map-quiet.mp4",
		holdMs: 8e3
	},
	{
		id: "till-brick",
		name: "Till Brick",
		category: "Payments",
		tagline: "Tap. The till agrees.",
		body: "A brick, a receipt, a network that holds at noon.",
		cta: "Get a till",
		still: "/ads/till-brick-hold.jpg",
		video: "/ads/till-brick.mp4",
		holdMs: 8e3
	},
	{
		id: "orbit-lane",
		name: "Orbit Lane",
		category: "Satellite",
		tagline: "Internet that does not wait for the street.",
		body: "A dish, a plan, a line that works past the last mast.",
		cta: "See coverage",
		still: "/ads/orbit-lane-hold.jpg",
		video: "/ads/orbit-lane.mp4",
		holdMs: 8e3
	},
	{
		id: "sandbox-nine",
		name: "Sandbox Nine",
		category: "Developer tools",
		tagline: "Ship before the stand-up ends.",
		body: "A sandbox, logs, a deploy that does not need a priest.",
		cta: "Open a box",
		still: "/ads/sandbox-nine-hold.jpg",
		video: "/ads/sandbox-nine.mp4",
		holdMs: 8e3
	},
	{
		id: "soundcheck",
		name: "Soundcheck",
		category: "Studio",
		tagline: "The room is already quiet.",
		body: "A booth, an engineer, a take you can keep.",
		cta: "Book the room",
		still: "/ads/soundcheck.jpg",
		video: "/ads/soundcheck.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "How long",
			options: [
				{
					id: "hour",
					label: "An hour",
					line: "One vocal. Honest.",
					wash: "rgba(160, 90, 40, 0.32)"
				},
				{
					id: "night",
					label: "A night",
					line: "The mix after the city sleeps.",
					wash: "rgba(40, 28, 24, 0.42)"
				},
				{
					id: "week",
					label: "A week",
					line: "An EP that has a last song.",
					wash: "rgba(70, 80, 110, 0.34)"
				},
				{
					id: "live",
					label: "Live take",
					line: "No click. The room as it is.",
					wash: "rgba(30, 30, 28, 0.45)"
				}
			]
		}
	},
	{
		id: "coast-fm",
		name: "Coast FM",
		category: "Radio",
		tagline: "The song, then the weather.",
		body: "A station that still has a presenter in the chair.",
		cta: "Tune in",
		still: "/ads/coast-fm-hold.jpg",
		video: "/ads/coast-fm.mp4",
		holdMs: 8e3
	},
	{
		id: "pressing-plant",
		name: "Pressing Plant",
		category: "Distribution",
		tagline: "The record leaves the plant.",
		body: "Pressing, sleeves, a van that finds the shops.",
		cta: "Press a run",
		still: "/ads/pressing-plant-hold.jpg",
		video: "/ads/pressing-plant.mp4",
		holdMs: 8e3
	},
	{
		id: "split-sheet",
		name: "Split Sheet",
		category: "Publishing",
		tagline: "The split, written down.",
		body: "Publishing that still has a percentage you can find.",
		cta: "Register a song",
		still: "/ads/split-sheet-hold.jpg",
		video: "/ads/split-sheet.mp4",
		holdMs: 8e3
	},
	{
		id: "night-reel",
		name: "Night Reel",
		category: "Streaming",
		tagline: "One film. Then sleep.",
		body: "A catalogue with endings. No next-episode trap.",
		cta: "Start a title",
		still: "/ads/night-reel-hold.jpg",
		video: "/ads/night-reel.mp4",
		holdMs: 8e3
	},
	{
		id: "call-sheet",
		name: "Call Sheet",
		category: "Production",
		tagline: "Call time is call time.",
		body: "Crew, locations, a producer who still has the list.",
		cta: "Crew a day",
		still: "/ads/call-sheet-hold.jpg",
		video: "/ads/call-sheet.mp4",
		holdMs: 8e3
	},
	{
		id: "subtitle-house",
		name: "Subtitle House",
		category: "Post",
		tagline: "The line, in the language of the room.",
		body: "Picture lock, subtitles, a mix that holds on a phone.",
		cta: "Book a pass",
		still: "/ads/subtitle-house-hold.jpg",
		video: "/ads/subtitle-house.mp4",
		holdMs: 8e3
	},
	{
		id: "blue-hour",
		name: "Blue Hour",
		category: "Open air",
		tagline: "A screen, a field, no carpet.",
		body: "One title. Chairs in the grass. The city a little quieter.",
		cta: "Get a chair",
		still: "/ads/blue-hour-hold.jpg",
		video: "/ads/blue-hour.mp4",
		holdMs: 8e3
	},
	{
		id: "estate-road",
		name: "Estate Road",
		category: "Estates",
		tagline: "The road is already in.",
		body: "Plots with lamps. A deed that is not a rumour.",
		cta: "Walk a plot",
		still: "/ads/estateroad.jpg",
		video: "/ads/estate-road.mp4",
		holdMs: 8e3
	},
	{
		id: "abuja-plot",
		name: "Abuja Plot",
		category: "Capital land",
		tagline: "Title in the city that files it.",
		body: "Surveyed, gazetted, a fence that can wait.",
		cta: "Check a file",
		still: "/ads/abuja-plot-hold.jpg",
		video: "/ads/abuja-plot.mp4",
		holdMs: 8e3
	},
	{
		id: "student-stair",
		name: "Student Stair",
		category: "Student housing",
		tagline: "A room near the hall. A lock that works.",
		body: "Beds, a cooker, rent that is written for the term.",
		cta: "See a room",
		still: "/ads/student-stair-hold.jpg",
		video: "/ads/student-stair.mp4",
		holdMs: 8e3
	},
	{
		id: "shop-front",
		name: "Shop Front",
		category: "Commercial",
		tagline: "A front that faces the foot.",
		body: "Ground floor. Meter in. A lease you can finish.",
		cta: "View a front",
		still: "/ads/shop-front-hold.jpg",
		video: "/ads/shop-front.mp4",
		holdMs: 8e3
	},
	{
		id: "face-down",
		name: "Face Down",
		category: "Dating",
		tagline: "Meet, then the phones go down.",
		body: "Profiles with a last name. A table, not a stage.",
		cta: "Make a table",
		still: "/ads/facedown.jpg",
		video: "/ads/face-down.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "What kind of table",
			options: [
				{
					id: "coffee",
					label: "Coffee",
					line: "Forty minutes. Daylight.",
					wash: "rgba(180, 150, 80, 0.28)"
				},
				{
					id: "walk",
					label: "A walk",
					line: "The marina, no menu.",
					wash: "rgba(120, 150, 164, 0.3)"
				},
				{
					id: "dinner",
					label: "Dinner",
					line: "One place. No scrolling.",
					wash: "rgba(90, 60, 40, 0.32)"
				},
				{
					id: "later",
					label: "Later",
					line: "When the city is quieter.",
					wash: "rgba(40, 28, 24, 0.42)"
				}
			]
		}
	},
	{
		id: "morning-paper",
		name: "Morning Paper",
		category: "News",
		tagline: "The story, then the byline.",
		body: "A brief that still has a reporter attached.",
		cta: "Read the brief",
		still: "/ads/morning-paper-hold.jpg",
		video: "/ads/morning-paper.mp4",
		holdMs: 8e3
	},
	{
		id: "two-tick",
		name: "Two Tick",
		category: "Messaging",
		tagline: "Delivered. Not performed.",
		body: "Chats that stay in the chat. No public square.",
		cta: "Start a thread",
		still: "/ads/two-tick-hold.jpg",
		video: "/ads/two-tick.mp4",
		holdMs: 8e3
	},
	{
		id: "neighbour-gate",
		name: "Neighbour Gate",
		category: "Neighbourhood",
		tagline: "The street, not the internet.",
		body: "A gate group that still knows the generator man.",
		cta: "Join a street",
		still: "/ads/neighbour-gate-hold.jpg",
		video: "/ads/neighbour-gate.mp4",
		holdMs: 8e3
	},
	{
		id: "esusu-book",
		name: "Esusu Book",
		category: "Cooperative",
		tagline: "The pot, with a book.",
		body: "A contribution, a turn, a number the group can see.",
		cta: "Open a pot",
		still: "/ads/esusu-book-hold.jpg",
		video: "/ads/esusu-book.mp4",
		holdMs: 8e3
	},
	{
		id: "ninety-day",
		name: "Ninety Day",
		category: "Treasury",
		tagline: "Ninety days. The rate on the first line.",
		body: "Bills you can hold to the date. No story attached.",
		cta: "See this tenor",
		still: "/ads/ninety-day-hold.jpg",
		video: "/ads/ninety-day.mp4",
		holdMs: 8e3
	},
	{
		id: "compound-house",
		name: "Compound House",
		category: "REIT",
		tagline: "Rent, collected. Units, named.",
		body: "A fund of floors you can visit.",
		cta: "Read the units",
		still: "/ads/compound-house-hold.jpg",
		video: "/ads/compound-house.mp4",
		holdMs: 8e3
	},
	{
		id: "family-table",
		name: "Family Table",
		category: "Family office",
		tagline: "The table that outlives the founder.",
		body: "A will, a book, a meeting that still has minutes.",
		cta: "Sit the table",
		still: "/ads/family-table-hold.jpg",
		video: "/ads/family-table.mp4",
		holdMs: 8e3
	},
	{
		id: "quiet-branch",
		name: "Quiet Branch",
		category: "Private bank",
		tagline: "A branch with a door that closes.",
		body: "One banker. A number. Tea if you want it.",
		cta: "Request a desk",
		still: "/ads/quiet-branch-hold.jpg",
		video: "/ads/quiet-branch.mp4",
		holdMs: 8e3,
		playable: {
			prompt: "What you need",
			options: [
				{
					id: "hold",
					label: "Hold",
					line: "Cash that stays cash.",
					wash: "rgba(40, 70, 56, 0.38)"
				},
				{
					id: "move",
					label: "Move",
					line: "A wire that lands today.",
					wash: "rgba(70, 90, 70, 0.34)"
				},
				{
					id: "next",
					label: "Next year",
					line: "A plan on one page.",
					wash: "rgba(180, 150, 80, 0.28)"
				},
				{
					id: "house",
					label: "House",
					line: "The deed, then the loan.",
					wash: "rgba(90, 60, 40, 0.32)"
				}
			]
		}
	},
	{
		id: "market-till",
		name: "Market Till",
		category: "Microfinance",
		tagline: "Stock for the stall you already have.",
		body: "A small line. A collector who knows the market day.",
		cta: "Ask for a line",
		still: "/ads/market-till-hold.jpg",
		video: "/ads/market-till.mp4",
		holdMs: 8e3
	},
	{
		id: "crescent-book",
		name: "Crescent Book",
		category: "Islamic finance",
		tagline: "A book that does not charge the forbidden way.",
		body: "Trade, lease, a scholar who will sit with the contract.",
		cta: "Open a book",
		still: "/ads/crescent-book-hold.jpg",
		video: "/ads/crescent-book.mp4",
		holdMs: 8e3
	},
	{
		id: "night-counter",
		name: "Night Counter",
		category: "Digital bank",
		tagline: "The counter that does not close.",
		body: "Pay, save, a balance at 1 a.m. that is still the balance.",
		cta: "Open tonight",
		still: "/ads/night-counter-hold.jpg",
		video: "/ads/night-counter.mp4",
		holdMs: 8e3
	},
	{
		id: "tape-desk",
		name: "Tape Desk",
		category: "Stock market",
		tagline: "The tape, in this city’s hours.",
		body: "A board, a close, a print you can keep.",
		cta: "Open the tape",
		still: "/ads/tapedesk.jpg",
		video: "/ads/tape-desk.mp4",
		holdMs: 8e3
	},
	{
		id: "first-allotment",
		name: "First Allotment",
		category: "IPO",
		tagline: "The offer, the price, the allotment.",
		body: "A prospectus that still has a last page.",
		cta: "Read the offer",
		still: "/ads/first-allotment-hold.jpg",
		video: "/ads/first-allotment.mp4",
		holdMs: 8e3
	},
	{
		id: "index-ten",
		name: "Index Ten",
		category: "ETFs",
		tagline: "Ten names. One line.",
		body: "A fund that tracks the board, not a rumour.",
		cta: "Buy a unit",
		still: "/ads/index-ten-hold.jpg",
		video: "/ads/index-ten.mp4",
		holdMs: 8e3
	},
	{
		id: "dividend-day",
		name: "Dividend Day",
		category: "Equities",
		tagline: "The day the company pays you.",
		body: "Shares, a date, a credit that matches the notice.",
		cta: "See the calendar",
		still: "/ads/dividend-day-hold.jpg",
		video: "/ads/dividend-day.mp4",
		holdMs: 8e3
	},
	{
		id: "pair-desk",
		name: "Pair Desk",
		category: "Forex",
		tagline: "A pair. A spread you can see.",
		body: "Naira, dollar, a ticket that fills.",
		cta: "Trade a pair",
		still: "/ads/pair-desk-hold.jpg",
		video: "/ads/pair-desk.mp4",
		holdMs: 8e3
	},
	{
		id: "size-cap",
		name: "Size Cap",
		category: "Prop desk",
		tagline: "Size you can cap. A desk you can audit.",
		body: "A book with limits. No personality cult.",
		cta: "See the rules",
		still: "/ads/size-cap-hold.jpg",
		video: "/ads/size-cap.mp4",
		holdMs: 8e3
	},
	{
		id: "hedge-line",
		name: "Hedge Line",
		category: "Futures",
		tagline: "The hedge, not the bet.",
		body: "A contract that still names the month.",
		cta: "Open a month",
		still: "/ads/hedge-line-hold.jpg",
		video: "/ads/hedge-line.mp4",
		holdMs: 8e3
	},
	{
		id: "open-book",
		name: "Open Book",
		category: "Commodities",
		tagline: "The book stays open after the port closes.",
		body: "Cocoa, crude, a price with a clock.",
		cta: "Watch a contract",
		still: "/ads/cocoamat.jpg",
		video: "/ads/open-book.mp4",
		holdMs: 8e3
	},
	{
		id: "cold-hour",
		name: "Cold Hour",
		category: "Crypto OTC",
		tagline: "Size, off the carnival.",
		body: "A desk, a quote, settlement you can name.",
		cta: "Request a quote",
		still: "/ads/cold-hour-hold.jpg",
		video: "/ads/cold-hour.mp4",
		holdMs: 8e3
	},
	{
		id: "peg-desk",
		name: "Peg Desk",
		category: "Stablecoin",
		tagline: "A naira peg you can unwind.",
		body: "Payroll, invoices, a coin that is still a number.",
		cta: "Open a peg",
		still: "/ads/peg-desk-hold.jpg",
		video: "/ads/peg-desk.mp4",
		holdMs: 8e3
	},
	{
		id: "hash-quiet",
		name: "Hash Quiet",
		category: "Crypto infra",
		tagline: "The chain, without the carnival.",
		body: "Nodes, keys, an hour that is actually an hour.",
		cta: "Read the stack",
		still: "/ads/hash-quiet-hold.jpg",
		video: "/ads/hash-quiet.mp4",
		holdMs: 8e3
	},
	{
		id: "seed-paper",
		name: "Seed Paper",
		category: "Custody",
		tagline: "The words, on paper, once.",
		body: "A wallet whose seed you wrote down and put away.",
		cta: "Start a wallet",
		still: "/ads/seed-paper-hold.jpg",
		video: "/ads/seed-paper.mp4",
		holdMs: 8e3
	},
	{
		id: "chambers",
		name: "Chambers",
		category: "Legal",
		tagline: "The file, tied. The hour, billed.",
		body: "A chambers that still answers the letter.",
		cta: "Instruct a brief",
		still: "/ads/chambers.jpg",
		video: "/ads/chambers.mp4",
		holdMs: 8e3
	},
	{
		id: "chalk-cut",
		name: "Chalk Cut",
		category: "Fashion",
		tagline: "Chalk, shears, a coat that will last.",
		body: "Cut in a room with north light. Fitted once.",
		cta: "Book a fitting",
		still: "/ads/chalkcut.jpg",
		video: "/ads/chalk-cut.mp4",
		holdMs: 8e3
	},
	{
		id: "lagoon-room",
		name: "Lagoon Room",
		category: "Hotels",
		tagline: "A room that faces the water.",
		body: "Linen, a balcony, a night that does not need an itinerary.",
		cta: "Hold a night",
		still: "/ads/lagoonroom.jpg",
		video: "/ads/lagoon-room.mp4",
		holdMs: 8e3
	},
	{
		id: "wet-apron",
		name: "Wet Apron",
		category: "Aviation",
		tagline: "The stairs are already down.",
		body: "A regional hop. A cabin that still has a greeting.",
		cta: "See the hop",
		still: "/ads/wetapron.jpg",
		video: "/ads/wet-apron.mp4",
		holdMs: 8e3
	},
	{
		id: "cocoa-mat",
		name: "Cocoa Mat",
		category: "Agriculture",
		tagline: "Beans on the mat. Price on the page.",
		body: "A cooperative that still names the farmer.",
		cta: "Sell a bag",
		still: "/ads/cocoa-mat-hold.jpg",
		video: "/ads/cocoa-mat.mp4",
		holdMs: 8e3
	},
	{
		id: "ride-light",
		name: "Ride Light",
		category: "Mobility",
		tagline: "A car that is already on your street.",
		body: "A fare, a plate, a driver who finds the gate.",
		cta: "Call a car",
		still: "/ads/ride-light-hold.jpg",
		video: "/ads/ride-light.mp4",
		holdMs: 8e3
	},
	{
		id: "work-gate",
		name: "Work Gate",
		category: "Jobs",
		tagline: "The role, the pay, the gate.",
		body: "Listings with a salary. Interviews that happen.",
		cta: "See roles",
		still: "/ads/work-gate-hold.jpg",
		video: "/ads/work-gate.mp4",
		holdMs: 8e3
	}
];
var FORMATS = [
	{
		id: "cinematic",
		name: "Cinematic Hold",
		kicker: "Full-bleed",
		summary: "A brand film occupies the answer well while the model thinks.",
		detail: "The well goes dark. A Hold plays — labeled, skip arrow after five seconds. If you leave it, the next brand starts. The playlist fills the wait, then the answer arrives."
	},
	{
		id: "native",
		name: "Native Think",
		kicker: "In-stream",
		summary: "A sponsored card sits where “thinking…” used to live.",
		detail: "Quiet, rectangular, honest. Brand, line, and a thin hold bar. The chat never leaves the thread. Best when the product wants the format felt, not seen."
	},
	{
		id: "playable",
		name: "Playable Pause",
		kicker: "Interactive",
		summary: "A tiny brand the waiting person can actually touch.",
		detail: "Pick a note, a finish, a season. The impression records the choice. If they do nothing, it still completes. Interaction is a gift, not a demand."
	}
];
var ADS = [
	{
		id: "northline",
		name: "Northline",
		category: "Grand touring",
		tagline: "Night roads, quietly.",
		body: "A long-range touring car for the hours after the map ends.",
		cta: "Reserve a night drive",
		still: "/ads/northline.jpg",
		video: "/ads/northline.mp4",
		holdMs: 6e3,
		playable: {
			prompt: "Choose a finish",
			options: [
				{
					id: "obsidian",
					label: "Obsidian",
					line: "Matte charcoal. Disappears after dusk.",
					wash: "rgba(20, 18, 16, 0.35)"
				},
				{
					id: "glacier",
					label: "Glacier",
					line: "Cool silver. Reads as light on wet asphalt.",
					wash: "rgba(170, 184, 198, 0.28)"
				},
				{
					id: "copper",
					label: "Copper",
					line: "Warm metal. Catches sodium lamps.",
					wash: "rgba(160, 92, 54, 0.32)"
				},
				{
					id: "forest",
					label: "Forest",
					line: "Deep green. Made for tree tunnels.",
					wash: "rgba(28, 58, 42, 0.38)"
				}
			]
		}
	},
	{
		id: "solace",
		name: "Maison Solace",
		category: "Fragrance",
		tagline: "A note made of smoke and evening light.",
		body: "An unlisted perfume. Worn after the room has gone quiet.",
		cta: "Discover the note",
		still: "/ads/solace.jpg",
		video: "/ads/solace.mp4",
		holdMs: 6e3,
		playable: {
			prompt: "Find your note",
			options: [
				{
					id: "smoke",
					label: "Smoke",
					line: "Birch tar, cold fireplace, a coat still on.",
					wash: "rgba(48, 32, 24, 0.42)"
				},
				{
					id: "citrus",
					label: "Citrus",
					line: "Bitter orange peel over pale woods.",
					wash: "rgba(196, 140, 64, 0.28)"
				},
				{
					id: "woods",
					label: "Woods",
					line: "Vetiver, dry cedar, a closed drawer.",
					wash: "rgba(42, 56, 40, 0.4)"
				},
				{
					id: "salt",
					label: "Salt air",
					line: "Mineral, skin, a window toward water.",
					wash: "rgba(120, 150, 164, 0.3)"
				}
			]
		}
	},
	{
		id: "harbor",
		name: "Harbor & Pine",
		category: "Lodging",
		tagline: "Wake on the lake. Leave no itinerary.",
		body: "A nine-room lodge. No spa menu. The weather is the program.",
		cta: "See the rooms",
		still: "/ads/harbor.jpg",
		video: "/ads/harbor.mp4",
		holdMs: 5500,
		playable: {
			prompt: "Pick a season",
			options: [
				{
					id: "thaw",
					label: "Thaw",
					line: "Ice leaving the dock. First coffee outdoors.",
					wash: "rgba(160, 186, 196, 0.28)"
				},
				{
					id: "high",
					label: "High summer",
					line: "Long light, pine resin, the lake still warm at ten.",
					wash: "rgba(214, 176, 96, 0.26)"
				},
				{
					id: "frost",
					label: "First frost",
					line: "Woodsmoke in the hall. The water goes black.",
					wash: "rgba(120, 84, 56, 0.34)"
				},
				{
					id: "deep",
					label: "Deep winter",
					line: "Snow to the windows. The fire is the only clock.",
					wash: "rgba(70, 86, 104, 0.38)"
				}
			]
		}
	},
	{
		id: "vale",
		name: "Atelier Vale",
		category: "Cloth",
		tagline: "One coat. A decade.",
		body: "Camelhair, cut in a room with north light. No season.",
		cta: "View the coat",
		still: "/ads/vale.jpg",
		video: "/ads/vale.mp4",
		holdMs: 5e3
	},
	{
		id: "kite",
		name: "Kite Audio",
		category: "Listening",
		tagline: "Close the room. Keep the mix.",
		body: "Open-back headphones for people who still sit down to listen.",
		cta: "Hear the pair",
		still: "/ads/kite.jpg",
		video: "/ads/kite.mp4",
		holdMs: 5e3
	},
	...HOLD_CATALOG
];
var SPOT_MS = 8e3;
var SKIP_AFTER_MS = 5e3;
var SUGGESTED_PROMPTS = [
	"What is Interlude",
	"What is a Hold",
	"Who is a Holder",
	"How much can I earn monthly?"
];
function adById(id) {
	return ADS.find((a) => a.id === id) ?? ADS[0] ?? {
		id: "northline",
		name: "Hold",
		category: "Brand",
		tagline: "A Hold.",
		body: "A labeled film in the wait.",
		cta: "Learn more",
		still: "/ads/northline.jpg",
		holdMs: 8e3
	};
}
function nextAdId(prevId, format) {
	if (!ADS.length) return "northline";
	const pool = format === "playable" ? ADS.filter((a) => (a.playable?.options.length ?? 0) > 0) : ADS;
	const list = pool.length ? pool : ADS;
	if (!prevId) return list[0].id;
	return list[(list.findIndex((a) => a.id === prevId) + 1) % list.length].id;
}
var FORMAT_ORDER = [
	"cinematic",
	"native",
	"playable"
];
function nextFormat(prev) {
	return FORMAT_ORDER[(FORMAT_ORDER.indexOf(prev ?? "playable") + 1) % FORMAT_ORDER.length] ?? "cinematic";
}
function formatLabel(id) {
	if (id === "native") return "Native";
	if (id === "playable") return "Playable";
	return "Cinematic";
}
function randomAdId() {
	if (!ADS.length) return "northline";
	return ADS[Math.floor(Math.random() * ADS.length)]?.id ?? ADS[0].id;
}
var memory = {};
var memoryStorage = {
	getItem: (k) => memory[k] ?? null,
	setItem: (k, v) => {
		memory[k] = v;
	},
	removeItem: (k) => {
		delete memory[k];
	}
};
/** localStorage in the browser; in-memory on the server so persist cannot crash SSR. */
var persistStorage = createJSONStorage(() => typeof window === "undefined" ? memoryStorage : window.localStorage);
/** Waiter who sat through the Hold. */
var VIEWER_SHARE = .4;
/** Holder — owner of the chat/app where the Hold played. */
var HOLDER_SHARE = .35;
/** Interlude — network, licence, Bank. */
var INTERLUDE_SHARE = .25;
function settleOne(skipped) {
	return split((skipped ? 12 : 22) / 1e3);
}
function settleFull() {
	return split(40 / 1e3);
}
function split(advertiser) {
	return {
		advertiser,
		holder: advertiser * HOLDER_SHARE,
		interlude: advertiser * INTERLUDE_SHARE,
		viewer: advertiser * VIEWER_SHARE
	};
}
function settleMany(views, skipRate) {
	const n = Math.max(0, Math.round(views));
	const skipped = Math.min(n, Math.max(0, Math.round(n * skipRate)));
	const completed = n - skipped;
	const c = settleOne(false);
	const s = settleOne(true);
	return {
		completed,
		skipped,
		advertiser: completed * c.advertiser + skipped * s.advertiser,
		holder: completed * c.holder + skipped * s.holder,
		interlude: completed * c.interlude + skipped * s.interlude,
		viewer: completed * c.viewer + skipped * s.viewer
	};
}
function pct(share) {
	return `${+(share * 100).toPrecision(12)}%`;
}
function shareLabel(share) {
	return `${pct(share)} · ${share.toFixed(2)}`;
}
function usd(n, digits = 2) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(n);
}
/** Actual split money — keeps fractional cents (up to 6 dp). */
function usdExact(n) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 6
	}).format(n);
}
function usdFine(n) {
	return usdExact(n);
}
function newId(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
function emptyTotals() {
	return {
		views: 0,
		completed: 0,
		skipped: 0,
		advertiser: 0,
		holder: 0,
		interlude: 0,
		viewer: 0
	};
}
var useBankStore = create()(persist((set, get) => ({
	viewerId: newId("il"),
	holderId: newId("ho"),
	connected: {
		aether: true,
		quill: true,
		holdjs: true
	},
	ledger: [],
	totals: emptyTotals(),
	setConnected: (id, on) => set((s) => ({ connected: {
		...s.connected,
		[id]: on
	} })),
	credit: ({ adId, skipped, source, full }) => {
		const pay = full ? settleFull() : settleOne(skipped);
		const entry = {
			id: Math.random().toString(36).slice(2, 10),
			at: Date.now(),
			adId: ADS.find((a) => a.id === adId)?.id ?? adId ?? "northline",
			skipped,
			source,
			...pay
		};
		const t = get().totals;
		set({
			ledger: [entry, ...get().ledger].slice(0, 80),
			totals: {
				views: t.views + 1,
				completed: t.completed + (skipped ? 0 : 1),
				skipped: t.skipped + (skipped ? 1 : 0),
				advertiser: t.advertiser + pay.advertiser,
				holder: (t.holder ?? 0) + pay.holder,
				interlude: t.interlude + pay.interlude,
				viewer: t.viewer + pay.viewer
			}
		});
	}
}), {
	name: "interlude-bank",
	storage: persistStorage,
	merge: (persisted, current) => {
		const p = persisted ?? {};
		return {
			...current,
			...p,
			holderId: p.holderId || current.holderId,
			totals: {
				...emptyTotals(),
				...p.totals ?? {},
				holder: p.totals?.holder ?? 0
			}
		};
	}
}));
function BankListener() {
	(0, import_react.useEffect)(() => {
		const onImp = (e) => {
			const d = e.detail;
			if (!d?.ad) return;
			useBankStore.getState().credit({
				adId: d.ad,
				skipped: Boolean(d.skipped),
				source: d.source || "hold.js"
			});
		};
		window.addEventListener("interlude:impression", onImp);
		return () => window.removeEventListener("interlude:impression", onImp);
	}, []);
	return null;
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-Dxu328fz.css";
var APP_NAME = "Interlude";
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Interlude is a new ad format for the seconds an AI spends thinking. A Hold plays, then the answer arrives."
			},
			{
				name: "theme-color",
				content: "#0b0b0a"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-background text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankListener, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-center",
					toastOptions: { style: {
						background: "var(--color-card)",
						color: "var(--color-foreground)",
						border: "1px solid var(--color-border)"
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-D_e3nD2D.mjs");
var Route$11 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./ask-BayKn7pd.mjs");
var Route$10 = createFileRoute("/ask")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./bank-o3ut4CXU.mjs");
var Route$9 = createFileRoute("/bank")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var Route$8 = createFileRoute("/formats")({ beforeLoad: () => {
	throw redirect({ to: "/hold" });
} });
var $$splitComponentImporter$6 = () => import("./hold-DMm9dYf4.mjs");
var Route$7 = createFileRoute("/hold")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./holder-C7wzgTmm.mjs");
var Route$6 = createFileRoute("/holder")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./install-DC7SMGcp.mjs");
var Route$5 = createFileRoute("/install")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./network-Bpz8UDU8.mjs");
var Route$4 = createFileRoute("/network")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./proposal-BEwlXy1o.mjs");
var Route$3 = createFileRoute("/proposal")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./studio-CVVFxROH.mjs");
var Route$2 = createFileRoute("/studio")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var Route$1 = createFileRoute("/waits")({ beforeLoad: () => {
	throw redirect({ to: "/holder" });
} });
var $$splitComponentImporter = () => import("./watch._adId-btnOLQwP.mjs");
var Route = createFileRoute("/watch/$adId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$11.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$12
	}),
	AskRoute: Route$10.update({
		id: "/ask",
		path: "/ask",
		getParentRoute: () => Route$12
	}),
	BankRoute: Route$9.update({
		id: "/bank",
		path: "/bank",
		getParentRoute: () => Route$12
	}),
	FormatsRoute: Route$8.update({
		id: "/formats",
		path: "/formats",
		getParentRoute: () => Route$12
	}),
	HoldRoute: Route$7.update({
		id: "/hold",
		path: "/hold",
		getParentRoute: () => Route$12
	}),
	HolderRoute: Route$6.update({
		id: "/holder",
		path: "/holder",
		getParentRoute: () => Route$12
	}),
	InstallRoute: Route$5.update({
		id: "/install",
		path: "/install",
		getParentRoute: () => Route$12
	}),
	NetworkRoute: Route$4.update({
		id: "/network",
		path: "/network",
		getParentRoute: () => Route$12
	}),
	ProposalRoute: Route$3.update({
		id: "/proposal",
		path: "/proposal",
		getParentRoute: () => Route$12
	}),
	StudioRoute: Route$2.update({
		id: "/studio",
		path: "/studio",
		getParentRoute: () => Route$12
	}),
	WaitsRoute: Route$1.update({
		id: "/waits",
		path: "/waits",
		getParentRoute: () => Route$12
	}),
	WatchAdIdRoute: Route.update({
		id: "/watch/$adId",
		path: "/watch/$adId",
		getParentRoute: () => Route$12
	})
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { nextFormat as C, nextAdId as S, SKIP_AFTER_MS as _, INTERLUDE_SHARE as a, adById as b, settleMany as c, usd as d, usdExact as f, FORMATS as g, ADS as h, HOLDER_SHARE as i, settleOne as l, persistStorage as m, Route as n, VIEWER_SHARE as o, usdFine as p, useBankStore as r, pct as s, router_exports as t, shareLabel as u, SPOT_MS as v, randomAdId as w, formatLabel as x, SUGGESTED_PROMPTS as y };

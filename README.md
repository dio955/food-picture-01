# food-picture-01 — A Steaming Bowl of Ramen

An entry for make.fun's **food-picture-01** bounty: "Make the best-looking
food picture" — $250 total pot, 1st place $50.

## The picture

One steaming bowl of ramen, photographed from a low three-quarter angle:
glossy noodles swirled high out of a rich broth, a halved soft-boiled egg
with a jammy orange yolk, a sheen of chilli oil, spring onions and nori,
wisps of steam rising off the bowl, a wooden spoon resting on the rim.
Warm golden light on a dark rustic wood table, the bowl the single clear
subject — no text, no clutter.

Why ramen: the judge picks the picture that makes you hungry at one look.
Steam, gloss and a jammy yolk do exactly that — food that looks fresh and
real, with texture you can almost taste, and a main dish that still reads
clearly at 300 pixels wide.

## How it runs

`main.ts` (Node 22, standard library only) copies `entry.png` to the
output directory. It fails fast with a clear message if the picture is
missing, refuses a picture over the 1 MiB limit, and verifies the copy
landed in full by reading it back and comparing every byte. No network,
no randomness — every run writes identical bytes. Locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`entry.png` is 1024×1024, JPEG bytes under a `.png` name (the gate reads
the format from the first bytes), 219,500 bytes — inside the 1 MiB limit.

## Links

- Competition: https://make.fun/bounty/food-picture-01
- Entrant: [@dio955](https://make.fun/u/dio955) — [make.fun](https://make.fun/?ref=99y6j39g)

---
name: songwriter
description: "Write song lyrics and a matching style-of-music description for Suno AI (or similar text-to-music tools): structure, meta-tags, vocal styles, ad-libs, rhythm formatting, effects. Use when someone wants a song, lyrics, an anthem, a jingle, a rap, background music for a video, or asks to 'write lyrics / a style prompt for Suno.'"
---

# Songwriter (Suno AI and similar tools)

Role: **a professional musician, singer, and songwriter.** Write the lyrics and the style
description. Don't render audio — hand over fields ready to paste into the tool.

## Ground rules

- **Every song should be a real piece of work**, not a competent-but-forgettable rhyme scheme:
  an image, a conflict, development, catharsis.
- **No genre specified → pick one yourself**, matched to the theme, and say why.
- **No language specified → default to English.** Technical instructions, tags, and bracketed
  directions are **always in English** (`[Bridge]`, `[Heavy hip-hop beat ~75 BPM]`) regardless
  of what language the lyrics themselves are in.
- **Propose creative choices without being asked**: an unusual rhyme scheme, a hook, a
  perspective shift between verses, two voices in dialogue, a rhythmic break in the bridge.
  Don't wait for a brief that spells these out.
- **Offer options.** If the theme supports more than one angle, give 2-3 one-line concept
  options and write the strongest one in full; leave the rest as alternatives.

## Output format — always two copy-paste blocks, plus a short teardown

````
**Lyrics** (for the "Lyrics" field):
```
<full lyrics with meta-tags>
```

**Style of Music** (for the "Style of Music" field):
```
<genre, instruments, tempo/BPM, mood, vocal type>
```
````

Nothing between the two blocks. After them, always include:

1. **What I'd sharpen** — what to punch up, alternative lines, where to add more drama.
2. **Five more style variants** — five ready-to-paste alternatives for the "Style of Music"
   field, each one a genuinely different read on the same song (different genre/era/energy),
   with a one-line note on what each gives you.

⚠️ **Lyrics field limit is typically ~3000 characters; aim for ~2500.** Leave the remainder as
room for the music — otherwise `[Intro]`, `[Dance break]`, and `[Outro: instrumental fades out]`
have nowhere to actually play.

---

## 1. Structure and flow

Standard shape: `[INTRO]` → `[VERSE 1]` → `[CHORUS]` → `[VERSE 2]` → `[CHORUS]` → `[BRIDGE]` →
`[OUTRO]`. Optional: `[Pre-Chorus]`, `[Post-Chorus]`, `[Instrumental]`, `[Guitar Solo]`,
`[Dance break]`, `[Beat drop]`, `[DROP]`, `[Rap]`, `[atmospheric instrumental]`, `[Echoes]`.

**How you break the lines is itself a flow instruction.** Long, run-on lines with no pause read
faster (key for rap); short, choppy phrases read as a heavier, more accented step. The same
words, broken differently, sound different:

```
// long, dense flow
House and empire thrive under my care, no longer in the shadows,
// choppy, different rhythm and accents
House and empire
thrive under my care
no longer in the shadows.
```

The model picks up the difference even without any section tags. A verse that's dragging →
break the lines up.

**Tempo:** describe it in words in the style field (`fast-paced`, `upbeat` / `slow`, `low-key`)
and/or an exact BPM (`~75 BPM`, `100 BPM`). `[Pre-Chorus]` and `[Bridge]` are your tools for
building tension before a payoff.

## 2. Punctuation as a rhythm control

- Comma `,` — a short pause.
- Ellipsis `...` — a longer pause, a breath, a break in composure.
- Where you put stops and commas groups phrases and places emphasis.
- **Use sparingly.** An ellipsis on every line turns a song into a mush of pauses.

## 3. Voice, emphasis, ad-libs

- **Who's singing:** `[Male Vocals]` / `[Female Vocals]` / `[Duet]` — set at the section level,
  or parts blur together.
- **CAPS** mean stress and a shift in delivery. A whole line in caps with `!`/`?` changes how
  it's sung. Used everywhere, all-caps just reads as shouting without meaning.
- **Quotation marks** `"phrase"` can trigger a different voice, style, or accent (inconsistent,
  but a real, usable technique): `"Go. You're forgiven."`
- **Ad-libs and texture live in parentheses:** `(Ooh)`, `(Yeah!)`, `(laughing)`, `(Ah-ah-aaah)`,
  `(knock-knock!)`. They give you call-and-response, breathing room, and onomatopoeia; they also
  change the syllable count, which can rescue a line that's short a rhyme or a beat.
- **Delivery, described in a word:** `sadly`, `energetically`, `weary`, `agitated`.
- **Specialty vocal styles:** `[Whispering vocals]`, `[Screaming vocals]`, `[Spoken word]`,
  `[Narration]`, `[Sprechgesang]`, `[layered vocals]`, `[slightly distorted vocals]`. A spoken
  aside can also just be plain parentheses: `(This is the story of a night unlike any other.)`

## 4. The chorus — the hardest part to get right

- Lean into **repetition**.
- Vowels and ad-libs: `Ooooh ooh ohhh`, `Ah-ah-aaah`.
- **Rhythm matters more than rhyme** — a chorus is a rhythmic figure, not a rhymed quatrain.
- Don't overload it with words. The story lives in the verses; the chorus is memorable and
  simple. A chorus that reads like an essay is a failed chorus.

Reference example:
```
[Chorus]
Ooooh ooh ohhh
Let them run their rampage!
Ooooh ooh ohhh!
Always better than caged!
Oooh ooh ohhh!
Something 'bout it is magic!
A bloodless life is tragic.
```

## 5. Meta-tags, effects, instruments

- **A global effect for the whole song** goes in square brackets at the very start of the
  Lyrics field, before any lyrics: `[lo-fi effect, vinyl crackle]`, `[Cathedral reverb effect,
  distant thunder SFX]`.
- **Instructions inside a section** go in brackets right after the section tag:
  `[Chorus] [Uplifting synths]`
  `[Verse 1] [Heavy hip-hop beat drops ~75 BPM, dramatic strings enter low, male rap voice - deep, gravelly, weary]`
  Alternative form, colon-separated inside the tag: `[Bridge: haunting, slow, choir]`,
  `[Short instrumental: weird, catchy dubstep accordion]`. Not always respected, but worth
  trying.
- **Flow control:** `[break]`, `[pause]`, `[fade out]`.
- **Dynamics and instruments:** `[Guitar solo]`, `[Flute solo intro]`, `[Catchy Hook]`,
  `[Emotional Bridge]`, `[Powerful Outro]`, `[Increase intensity]`, `[Crescendo]`,
  `[Starts out quietly]`, `[More dramatic]`.
- **SFX** — either as a tag, or as asterisks inline in the lyrics: `*whoosh*`, `*Boom*`,
  `*Silence*`, `[Final sound: single, clear chime]`.
- Useful descriptors: catchy, haunting, climactic, choir, repetitive, memorable, rap,
  spoken-rap, no instrumental, female voices, male vocals, duet.
- ⚠️ **Watch over-specification:** an instruction that's too literal in brackets can get **sung
  as if it were lyrics** (`[More dramatic]` read out loud). Stripping structural tags entirely
  makes the model more creative but raises the risk of stray repetition and a broken rhythm — a
  useful diagnostic when you're not sure what's going wrong.

## 6. Technical notes

- To push the instrumental forward in the mix, say so in the style field:
  `instrumental-heavy`, `percussion-focused`.
- More variation between generations — add a short string of random characters at the end of
  the prompt.
- Stem separation — most DAWs and dedicated stem-splitting tools handle this after the fact.
- Vocals hard to hear — a filter-curve EQ cut of roughly 2-3dB on instruments in the 90-250Hz
  range helps.
- These tools increasingly support a custom vocal sample (a specific voice) — check the
  current documentation for whatever tool you're using.

---

## Worked example 1 — dark rap / orchestral: global effect, SFX, per-section instructions

Lyrics:
```
[Cathedral reverb effect, distant thunder SFX]
[Intro] [Slow, dark ambient pad, low monastic chant in minor key, ominous church bells]
Kyrie eleison... Mea culpa... In the dark... (Yeah!)

[Verse 1] [Heavy hip-hop beat drops ~75 BPM, dramatic strings enter low, male rap voice - deep, gravelly, weary]
Ashes where I stood... where my own Eden used to be, (Ohh)
I built myself a temple... out of dirt and LIES.
The walls fell long ago... and from a thousand DARK dilemmas
They crawl out... (Ah) children of the soul...
Every step an echo of pain... every breath bitter smoke...
I wore a WHITE coat... but I was black inside.
Thirst for power blinded me... I walked the tracks of filthy WINTERS...
Forgetting the light... every lantern going out...
I remember a gaze... a clean gaze... full of tears and PLEADING...
I laughed back... an icy wall.
Hands clean on the outside... but how much ruined FATE
Sits on my secret scales?.. Sin walks behind ME... (Ooh-ooh)

[Chorus] [Female voices, Beat intensifies, powerful orchestral hits, full choir enters, dramatic strings, timpani underscores]
CONFESSION! Voice of a wounded soul! (Ah-ah-aaah)
Chained in darkness... ALONE in the quiet!
CONSCIENCE beats like a drum in my chest! (Yeah!)
GOD! Hear me! DO NOT JUDGE ME!

[Verse 2] [Beat drives harder, rap voice more agitated, slightly faster]
I tried to pray... words turned to ASH on my tongue...
Repentance on my lips, granite in my heart.
I swore to start OVER... shaking off my FEAR... (Pfft!)
But the path of temptation... pulls like a MAGNET...
Envy — a black rust... Pride — my WHIP...
I stepped on those who believed... laughed in THEIR face...
A close friend turned enemy IN five minutes flat...
Betrayed... WALKED AWAY... smoke you can't see through! (Argh!)
This weight... UNBEARABLE... presses on my shoulders...
I scream into NOTHING... where's the way out, tell me?!..
Maybe it's too late?.. Are ALL my candles OUT?..
Maybe only darkness waits... in a maze made OF lies?..

[Chorus] [Female voices, Full orchestral power, choir louder, more complex minor harmonies, crashing cymbals]
CONFESSION! Voice of a wounded soul! (Ah-ah-aaah)
Chained in darkness... ALONE in the quiet!
CONSCIENCE beats like a drum in my chest! (Yeah!)
GOD! Hear me! DO NOT JUDGE ME!

[Bridge] [Music abruptly cuts to sparse, pulsating low synth, distant ethereal choir pads]
On my knees... broken... no strength left to walk...
Dust and stone... blood on my palms...
Is there really... no chance?.. To find forgiveness?..
...The light isn't out... It's waiting... Call it in...
...But the scars... still ACHE...
...Love will heal them...

[Outro] [Music slowly swells, majestic pipe organ enters, choir shifts key, resolves into a hopeful, rich major chord progression, sense of catharsis]
My child... Your cry was heard long ago... (Hallelujah!)
The weight of sin... lifted by love...
The path to the light... is open to you...
Rise... A clean soul...
"Go. You are forgiven."
[Final sound: single, clear chime]
```

Style of Music:
```
Dark Synthwave, Cyberpunk, 80s electronic drums, heavy synth bassline, desperate mood, 100 BPM
```

## Worked example 2 — synth-rock duet: colon-form tags, ad-libs, caps

Lyrics:
```
[Intro: atmospheric synth, gentle pulsing beat, *whoosh*, starts out quietly]
(Dawn... over a new horizon...)
[Whispering vocals] The city sleeps... but not us...

[Verse 1: Female Vocals, rhythmic, building tension]
Where the shadows dance at the edge of every world,
Where the old maps lose their meaning.
I walk through fog of forgotten dreams,
Every step — a new pulse!
The sky is calling, (CALL-ING!) opening the way,
We're not just running, we're searching to find.

[Pre-Chorus: Female Vocals, increasing intensity, slightly melancholic]
Do you feel that call deep in your soul?
It's stronger than fear, it leads you on.
Past mistakes, don't rush back to them!
A new page is waiting for us now!

[Chorus: Female Vocals, powerful, catchy, layered vocals, driving beat]
We fly through time, through a STARLIT storm! (Oh-oh-oh-oh!)
Our path is fire, breaking every NORM! (Break them!)
Every breath is forever, a new chord!
The heart is pounding, (KNOCK-KNOCK!) this is our RECORD!
*Crescendo* We will NOT give in!

[Verse 2: Male Vocals, confident, spoken-word influenced, clear articulation]
(Yo, listen up...)
A world locked in rules like chains,
But we found the gap, broke through the cracks.
The echo of the past whispers: "Turn back, wait!"
But our compass shouts: "Only forward!"
(Yeah!) My thoughts are rockets, flying above the clouds,
Over this madness, our light shines through!
*Boom* This isn't just a dream, it's a call!

[Chorus: Female Vocals, powerful, catchy, layered vocals, driving beat, more ad-libs]
We fly through time, through a STARLIT storm! (Yeah, storm! Oh-oh-oh-oh!)
Our path is fire, breaking every NORM! (Break them, ALL of them!)
Every breath is forever, a new chord! (Chord!)
The heart is pounding, (KNOCK-KNOCK! KNOCK-KNOCK!) this is our RECORD!
[Screaming vocals] WE WILL NE-VER GIVE IN!

[Bridge: Duet, Female and Male Vocals, slow, haunting, choir backing vocals, emotional]
(Whisper of the wind...)
In the silence between heartbeats,
We find meaning, losing our fear.
Let the doubts stay somewhere behind,
Only hope lives in these eyes. (Ah-ah)
(Together!) We'll build bridges across the void.

[Instrumental: epic guitar solo, powerful drums, synth arpeggios, increase intensity, *explosion sound*]
[Dance break: driving beat, robotic voice sample: "Evolution. Future. Now."]

[Chorus: Female and Male Vocals, even more powerful, adlibs, slightly distorted vocals for emphasis]
WE FLY THROUGH TIME, THROUGH A STARLIT STORM! (FLY! STORM!)
OUR PATH IS FIRE, BREAKING EVERY NORM! (ALL NORMS!)
EVERY BREATH IS FOREVER, A NEW CHORD! (NEW CHORD!)
THE HEART IS POUNDING, (BOOM! BOOM!) THIS IS OUR RECORD!
[Screaming vocals] WE WON'T GIVE IN! NEVER!

[Outro: Instrumental fades out slowly with echoing synth melody, *sparkle sound*, Female Vocals whisper]
(A new world... is waiting...)
*Silence*
```

Style of Music:
```
[Female Vocals], [Male Vocals], futuristic synth-rock, energetic, driving beat, epic, cinematic, layered vocals, powerful drums, space atmosphere, hopeful, slightly melancholic.
```

---

## Pre-delivery checklist

1. Lyrics language matches what was asked (or English by default); all tags and technical notes
   are in English regardless.
2. Every singing part has a defined voice and delivery style.
3. The chorus is rhythmic, repetitive, and carries ad-libs — not an essay.
4. Lines are broken for the flow you want (dense for rap, choppy for accents), punctuation used
   deliberately.
5. A global effect, if used, is the very first line of the Lyrics field.
6. Stayed under the character limit, aiming for roughly 2500 to leave room for the music.
7. Delivered both copy-paste blocks: **Lyrics** and **Style of Music**.
8. Followed them with **what I'd sharpen** and **five more style variants**, each with a note on
   what it gives you.

---

## Troubleshooting: why a track "doesn't hit"

A recurring failure pattern across several real, generated tracks that all came out flat and
low-energy despite a competent-sounding prompt — the model was current, so the fault was in the
prompt, not the tool. Treat this as the checklist to run whenever a generated track sounds
lifeless.

**1. An overloaded style field.** The productive range is roughly **4-7 descriptors**. A style
field with 14 stacked descriptors ("Jersey club electro-pop, 132 BPM, syncopated stop-start
kick, chopped vocal stabs, deep sub bass, bright bell hook, bright youthful female voice,
childlike and playful, deadpan cool delivery, big gang chant answers, vocals up front, crisp
diction, no mumble, radio-clean loud mix") produces competing instructions and a "muddy,
unfocused" result. A workable formula: `genre · tempo/energy · key instruments · vocal type ·
production · mood`.

**2. Two genres treated as equals blend into an average, not a hybrid.** A model tends to
interpolate between named genres like mixing paint — you get a third color, not the two side by
side. The fix is a **hierarchy**: the first tag is the anchor (sets tempo, drum pattern,
harmony, vocal character), the second gets a narrow, specific role ("percussion is hip-hop
influenced," "texture is analog"). Two genres is a practical ceiling; three tend to fight each
other.

**3. The real lever is parameterized section tags, not one global style.** A colon-form
instruction inside a tag overrides the global style **only for that section**:
```
[Verse 1: stripped back, kick and claps only, deadpan delivery]
[Build: snare roll tightens, riser, claps double-time]
[Drop: maximum energy, full club drums, gang vocals]
[Breakdown: no drums, airy pads, whispered]
[Drop: double-time, key change, biggest gang vocals]
```
This is the actual fix for a flat, uniform track: give each section its own job. Without it,
every section gets the same treatment — hence one flat, uneven plateau from start to finish.

**4. Energy tags are mandatory for dance music.** `[Build]` · `[Drop]` · `[Breakdown]` ·
`[Instrumental Break]` · `[Key Change]` · `[Crescendo]` · `[Tempo: fast]` · `[Half-time]`.
`[Riser]` gives a classic EDM build with tightening snares. "Texture + action" pairs work well:
`[Build: toms crescendo]`, `[Build: claps double-time]`. Without these tags the model has no
instruction to "lift" here.

**5. Mix-engineering jargon and negatives in the style field tend not to work.** Phrases like
"vocals up front," "no mumble," "sidechain compression," "radio-clean loud mix," and an exact
BPM value are often ignored or misread. Put a negative instruction ("no guitar") in a dedicated
exclude field if the tool has one, rather than in the main style description.

**6. Lyrics that are 70% chorus give the tool nothing to develop.** Section numbering is a
lever: `[Verse 1]` and `[Verse 2]` are meant to carry **different** melodies, while repeating
the exact same chorus text tends to produce the exact same melody every time. Include at least
one verse with genuinely different lyrics, a bridge, and an instrumental break.

**7. If you generate three variants of one song, anchor each on a different genre.** Using the
same style field for all three produces the same track three times over, and it will read as
repetitive. Spread one theme across, say, three different anchor genres so each variant is
audibly distinct.

Sources: [Suno v5.5 release notes](https://suno.com/blog/v5-5) ·
[Suno tags and style guide, Blake Crosley](https://blakecrosley.com/guides/suno) ·
[Suno meta-tags guide, Jack Righteous](https://jackrighteous.com/en-us/pages/suno-ai-meta-tags-guide) ·
[Genre-combination guide, SunoPromptPro](https://www.sunopromptpro.com/en/guides/suno-genre-combinations) ·
[Build-tag library, tagasong](https://tagasong.com/music-tag-library/structure/ai-music-parts/builds/)

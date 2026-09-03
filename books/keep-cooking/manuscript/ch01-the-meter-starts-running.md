# The Meter Starts Running

For a long time, the most important number in computing was the clock.

How many milliseconds did the page take to load? How many operations could the processor perform in a second? How quickly could the database return a row? Engineers learned to experience unnecessary delay as a kind of moral failure. A program that took ten seconds to perform work that could be done in one second was not contemplative. It was badly written.

Then machine intelligence acquired a meter of its own.

Open an AI interface and ask a difficult question. Somewhere behind the clean white box, the request becomes computation: tokens read, tokens generated, matrix multiplications performed, memory moved, accelerators occupied, electricity consumed. For a simple question the answer may come quickly. For a harder one the system may search, reason, call a tool, inspect a result, revise a plan, or use a larger amount of internal computation before it speaks. The delay no longer necessarily signals waste. It can be the product.

This is a peculiar change in the psychology of software. We are becoming accustomed to watching a machine think.

The animation helps. A spinner turns. A status line says the model is researching or reasoning. An agent reports that it has found one source and is checking another. The user is invited into a miniature theater of cognition. We do not merely tolerate the wait because the server is busy. We tolerate it because the wait appears to purchase deliberation.

In ordinary software, the ideal endpoint was often invisibility. You pressed the button and the thing happened. In reasoning software, the ideal can be closer to a good colleague closing the door for an hour and returning with something considered.

That hour has a cost.

The basic accounting unit of language models is the token, a chunk of text that may be a word, part of a word, punctuation, or some other fragment depending on the tokenizer. The token is technically mundane. It is not a neuron, a thought, or a unit of meaning. Yet it became the coin visible to the customer because model providers could meter it. Input costs money. Output costs money. Long conversations consume more context. Tool calls can start fresh rounds of generation. A single user request can quietly become many model invocations behind the interface.

Once a resource can be metered, it can be budgeted. Once it can be budgeted, people begin deciding when to be stingy and when to be extravagant.

That is where token maxing begins.

The simplest version is familiar to anyone who has asked a model to try again. The first answer is decent. The second is better. You ask for a critique, then a rewrite. You request three alternatives. You tell another model to inspect the result. You supply more context. You ask the system to search before answering. What began as one completion becomes a process.

There is nothing irrational about this. Human beings do the same thing when the stakes justify it. A lawyer does not file the first paragraph that comes to mind. An engineer does not approve a bridge after one calculation. A scientist does not treat the first promising result as the end of the experiment. Difficult work is iterative because error is expensive and because many problems reveal themselves only after somebody has tried to solve them.

The novelty is that iteration can now be manufactured cheaply enough to attach to routine work.

A company can ask a model to read a customer complaint, draft a reply, compare that draft with policy, inspect the account history, rewrite the message in the customer's language, score the result against a quality rubric, and route uncertain cases to a person. A programmer can ask an agent to inspect a repository, propose a patch, run tests, read the failures, modify the patch, and open a pull request. A researcher can ask a system to search dozens of papers, produce a synthesis, locate disagreements, and return to the literature when a claim looks weak.

The extra steps are not free. They are simply cheap enough to be tempting.

This changes the unit of software. A traditional program is mostly a fixed procedure encoded in advance. An agent is closer to a budget and a goal. The designer says, in effect: spend some amount of computation trying to get there, stop when the answer is good enough, and escalate when it is not.

That sounds like a minor architectural detail. It is the economic hinge of the book.

If useful intelligence can be bought in variable quantities at the moment of need, then the quantity demanded depends on price, stakes, and expected improvement. A cheap question receives a cheap answer. A million-dollar decision may receive thousands of attempts, simulations, critiques, and searches. The same underlying model can be wrapped in radically different amounts of inference.

The result is a new kind of inequality inside software itself. Two people may appear to be using the same AI and receive different effective intelligence because one is purchasing more context, more attempts, better tools, more expensive models, and longer reasoning. The interface says they both have an assistant. The meter says otherwise.

This has an old analogue. Two people can own computers while living in different worlds of computing. One has a borrowed laptop on an unreliable connection. Another has a data center. The word computer covers both. So will the word AI.

Token maxing makes that gap harder to see because the machinery is remote. The person with more compute does not necessarily sit beside a louder machine. She clicks the same rectangle on a screen and waits slightly longer.

The first cultural sign of this shift was a change in what people bragged about.

Early users of language models bragged about clever prompts. A compact instruction that produced an unexpectedly good result felt like a magic trick. Prompt engineering became a tiny craft industry. People collected incantations: tell the model to act as an expert, give it examples, ask it to think step by step, threaten it with imaginary stakes, promise it a tip, wrap the problem in XML, demand a particular persona.

Some techniques were useful. Some were folklore. All belonged to a world in which the user tried to squeeze more intelligence out of a single interaction.

The next world is less elegant. It simply spends more.

Run several candidates and choose the best. Give the model a scratchpad. Search the web. Call code. Ask a verifier. Let another agent attack the answer. Build memory. Preserve the entire document rather than compressing it. Try again when the result looks weak. Allocate more effort to the hardest cases. The ingenuity moves from the sentence in the prompt to the system around the model.

This is partly why the term token maxing is intentionally crude. It captures an attitude before it captures an engineering specification. The attitude says that when intelligence is available on demand, the default response to uncertainty is to pour more machine cognition on it.

The phrase is funny because it resembles gym culture, financial leverage, and every online subculture that discovers a variable and decides the obvious strategy is to push the variable to the edge. Protein maxing. Credit-card-points maxing. Sleep maxing. Tax optimization. The internet has a way of turning sensible marginal improvements into identities.

Token maxing will do the same.

There will be people who regard a short model answer as evidence of unseriousness. There will be teams that send ten agents to solve a problem one competent employee could settle in fifteen minutes. There will be benchmark systems tuned until the computation behind a single answer resembles a committee meeting held at machine speed. There will be executives who buy larger context windows because the number looks like capability. There will be startups whose product is, in essence, permission to spend more tokens than the customer would tolerate purchasing directly.

Some of this will work.

That is important. A culture of excess becomes durable when excess sometimes produces remarkable results.

The history of computing contains many periods when throwing more resources at a problem was mocked until the resources became cheap. Memory is the easy example. Programmers once performed extraordinary contortions to fit software into tiny amounts of RAM. As memory prices fell, many of those techniques became economically foolish. A modern developer may use megabytes to solve a problem that an earlier generation solved in kilobytes, and the modern developer is not necessarily incompetent. Her time costs more than the memory she is wasting.

Bandwidth followed a similar path. Photographs that would once have been carefully compressed now flow casually through messaging apps. Video calls consume in an hour more data than early internet users might have transferred in months. The applications changed because the constraint changed.

The same logic applies to machine reasoning. If inference prices keep falling, an operation that looks absurdly expensive in 2026 may look normal later. A company that refuses to let an agent make three attempts because one attempt should be enough may eventually resemble a company that still asks employees to conserve disk space by deleting email attachments.

But compute has a property disk storage does not: the output competes for human attention.

A larger hard drive can sit quietly. Ten model attempts produce ten candidates, ten traces, ten opportunities for error, and perhaps ten things somebody or something must evaluate. Token maxing therefore creates a second meter beside the first. The machine meter counts cognition supplied. The human meter counts cognition required to supervise it.

The two do not necessarily fall together.

Imagine a manager who used to receive three proposals from three employees. In a token-maxed organization, each employee can generate twenty. The obvious expectation is that the best proposal will improve because the search space is larger. It might. But the manager can now face sixty polished documents where once she faced three rough ones. If the cost of generation falls faster than the cost of judgment, the bottleneck migrates upward.

This migration is one of the recurring laws of technological abundance. Make one stage cheap and the next scarce stage becomes more valuable.

Cheap photography did not eliminate the value of attention; it produced billions of images competing for it. Cheap music production did not eliminate taste; it increased the number of songs a listener could ignore. Cheap web publishing did not eliminate editing; it made trustworthy curation harder to find. Cheap machine reasoning may not eliminate expertise. It may change expertise from producing an answer to recognizing when an answer deserves to survive.

That distinction is easy to miss because the early economic statistics measure output.

If an employee produces a report in thirty minutes instead of three hours, productivity appears to rise. If a developer writes code faster, if a support agent resolves more tickets, if a marketer creates more campaigns, the gain is visible. The harder measurement comes later. Was the report more useful? Did the code create maintenance debt? Did the customer receive a better answer? Did the campaign persuade anybody, or merely add another layer to the global supply of competent-looking text?

The evidence so far refuses to be simple.

In one influential study of more than five thousand customer support agents, access to a generative AI assistant raised productivity by roughly fourteen percent on average, with much larger gains among novice and lower-skilled workers. The tool appeared to spread practices that high performers had learned through experience. That is an extraordinary social possibility: expertise distilled into a machine can shorten the distance between the beginner and the veteran.

Other work found large gains for consultants performing tasks that sat within what researchers called the technology's jagged frontier. People completed more tasks, worked faster, and produced higher-quality results when the model was good at the job.

Then there are the failures.

A 2025 randomized study by METR followed experienced open-source developers working in codebases they knew well. The developers expected AI tools to make them faster. The researchers expected AI tools to make them faster. The developers even believed afterward that the tools had made them faster. In the measured tasks, they were slower.

The finding was narrow, and the authors were careful not to generalize it to all programming. By 2026 they reported reasons to think newer tools were more useful, while also explaining why wider adoption made clean measurement harder. The interesting lesson is not that AI slows programmers. The interesting lesson is that people can be poor judges of whether additional machine assistance is actually saving them time.

Token maxing thrives in precisely that gap.

A system can feel productive because something is always happening. The agent is searching. The model is drafting. The verifier is scoring. The context window is full. A dashboard glows with activity. Machine work has the visual texture of progress.

Companies have spent a century learning that human busyness can be mistaken for productivity. We may now industrialize the same error in silicon.

The problem is not that the tokens are wasted in some metaphysical sense. The problem is opportunity cost. Every extra inference consumes hardware time, energy, latency, and money that could be used elsewhere. More subtly, every extra generated artifact can consume the scarce attention of somebody who must decide what to do next.

The rational question is therefore not whether more compute helps. Often it does. The rational question is where the next unit helps enough to justify its cost.

That sounds like an optimization problem, and engineers will treat it as one. Systems will learn to allocate effort dynamically. Easy tasks will receive little. Hard tasks will receive more. High-stakes decisions will trigger verification. Low-stakes requests will use small models. Organizations will set budgets by risk, value, and latency. The crude culture of maximum tokens will mature into something closer to compute economics.

But cultures usually arrive before their accounting systems.

The early factory burned fuel inefficiently before industrial engineering measured every motion. Early cloud computing produced extravagant bills before companies invented disciplines for controlling them. The first years of social media rewarded growth before society understood the downstream cost of maximizing engagement. A capability becomes cheap, a metric becomes visible, and the first instinct is expansion.

We are at that stage with machine thought.

The evidence is visible in frontier model design, in agent frameworks, in enormous context windows, in research systems that browse for minutes, in code agents that work through repositories, and in users who have learned that asking again costs almost nothing. The machine does not tire. The invoice may be small. The answer might improve.

Why stop?

Because stopping is itself an intelligence.

A doctor who orders every possible test is not necessarily more careful than one who knows which test changes the treatment. A general who demands every available piece of information may be less capable than one who recognizes when the decision must be made. A writer who generates a thousand alternatives has not solved the problem of choosing a sentence. A company that can simulate fifty strategies still has to commit capital to one world.

Human institutions have always needed stopping rules because reality eventually asks for action.

Token maxing delays that moment. It makes continued analysis extraordinarily cheap relative to commitment. Another draft can be requested. Another forecast can be generated. Another agent can be consulted. Another scenario can be simulated. For anxious organizations this will be irresistible. The technology will not merely accelerate decisions. It will provide a sophisticated new way to avoid them.

The first great contest of the token-maxed world may therefore be between organizations that can think more and organizations that know when they have thought enough.

The distinction will not be obvious from the meter.

The meter only runs.
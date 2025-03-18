This is the source code for http://benoithiller.com.

It is written using Next.js 15 and React 19 mostly to play around a bit with the changes to both since I've last worked with them.

The most notable changes in that time being Server Components and the addition of the App Router to Next.js. I will note that using the App Router mostly to replicate the core functionality of the Pages Router, that being a folder of files that each get mapped directly to a page, feels a bit silly. The improvements to the logic of SSR and things like head content handling are well worth it though.

I'm also using tailwindcss, however it is honestly bizarre. I suppose it is an improvement over Bootstrap(which never managed to fix its awkward dependencies, especially the use of SASS), but it is another solution that effectively amounts to abandoning CSS entirely and placing all of your styles into html at the expense of low to non-existent code re-use and readability.

It seems reasonable to expect to see a substantial React tailwind integration in the near future. Cramming all of your styles into `className` while still needing to write everything with roughly the same granularity as working with the `styles` property is ridiculous. There is an obvious, and not overly difficult to implement, improvement there of adding a property that enables providing a structured form of the classes that tailwind supports.

## License

This work is licensed under the MIT-0 license with the exception of the contents of the `src/blog` folder for which all rights are reserved. Note that the rendered blog pages grant additional licenses to their contents that are documented therein.

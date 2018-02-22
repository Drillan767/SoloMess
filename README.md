# SoloMess (old RawXD)

### Intro

There is a time in your developer life when you tell yourself "OK, I think I can say I do know this language, and I can create a functional website in a few hours. So, how far can I go now ?"

After thinking for a while, I thought about my current website that is for me a beacon of the knowledge I gathered until now: Learning how to do stuff with Rails, pushing further, reproducing on the website, being proud of the result.

Right now, things that made me stay awake up until 3 in the morning until it worked almost makes me laugh (but since it's my own work, I won't). But now imagine someone that would like to have a website with a few functionalities, (almost) fully manageable and customizable, but they can't because it costs too much or they don't have enough skills in web development? Now, this is the moment where I laugh.

### Installation

...Yet to come
- should be something like 'git clone repo/repo'
- bundle install
- rake db:create db:migrate db:seed
- rake webpacker:compile

(Don't actually run this, nothing is ready, I'll tell you when it's good I swear)

### Support

A contact form linked directly to my own private mail account will be available from the back office, where you'll be able to upload a screenshot of the issue, ask for some more functions, or tell me you love me.

# TODO: 

* Create a resume system where the person can add some experience and stuff
* The user should be able to display one of the following elements:
  1. The CV (if available)
  2. The user's abilities (if available)
  3. The user's last 3 or 5 projects (by default)
 
* The user won't have a contact form by default. He can either add an address and/or a mail, or create a MailGun account
  * When the MailGun account is created and the correct fields are filled, a contact form is visible.

* The user should be able to setup some background images like Jaeger's curent website.

# Self TODO:

### Articles & Portofolio:

* If no file was ready to upload, trigger explorer window
* Check if element exists before adding it to the multiupload, so it doesn't mess with the keys
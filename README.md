Author: shridharp
Feature: Gulp task for 'en.json' and 'dv.json' creation
Note: 'dv.json' is created for identifying which labels or places are left/skipped by developers for i18n changes.
Steps To perform:-
1. While doing i18n, developers should do it with following mentioned pattern:-
    i. If i18n is done in curly braces like :-
        <button>{{ $t('btn_confirm') }}</button>
    Then it should be done with pattern:-
        <button>{{ $t('##btn_confirm##@@Confirm@@') }}</button>

    ii. If i18n is done at attribute level in element like :-
        <button :label="$t('btn_confirm')"></button>
    Then it should be done with pattern:-
        <button :label="$t('##btn_confirm##@@Confirm@@')"></button>

    iii. If i18n is done at script level like :-
        this.$toasted.error(this.$t('invalidUsername'), {
            theme: 'bubble',
            duration: 6000
        })
    Then it should be done with pattern:-
        this.$toasted.error(this.$t('##invalidUsername##@@User name is invalid@@'), {
            theme: 'bubble',
            duration: 6000
        })

2. After this just run command 'npm run geni18n'
3. This will create backup of current 'en.json'
4. Create new 'en.json' and 'dv.json'
5. Further the 'en.json' can be used to do i18n in any language at 'https://cs.mkcl.org'
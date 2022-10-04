import {
  query as domQuery,
  queryAll as domQueryAll
} from 'min-dom';

import { render, cleanup } from '@testing-library/preact';

import TestContainer from 'mocha-test-container-support';
import PopupMenuList from 'src/popupMenu/PopupMenuList';


describe('<PopupMenuList>', function() {

  let container, parent;

  beforeEach(function() {
    parent = TestContainer.get(this);

    container = document.createElement('div');

    container.classList.add('djs-popup-parent');

    parent.appendChild(container);
  });

  afterEach(function() {
    cleanup();
  });


  it('should group entries', function() {

    // given
    const entries = [
      { id: 'save', label: 'SAVE', group: 'file' },
      { id: 'load', label: 'LOAD', group: 'file' },
      { id: 'undo', label: 'UNDO', group: 'command' },
      { id: 'redo', label: 'REDO', group: 'command' },
      { id: 'clear', label: 'CLEAR' }
    ];

    // when
    createPopupMenuList({ container, entries });

    // then
    var parent = domQuery('.results', container),
        group1 = parent.children[0],
        group2 = parent.children[1],
        group3 = parent.children[2];

    expect(group1.dataset).to.have.property('group', 'file');
    expect(group2.dataset).to.have.property('group', 'command');
    expect(group3.dataset).to.have.property('group', 'default');

    expect(group1.childNodes).to.have.lengthOf(2);
    expect(group2.childNodes).to.have.lengthOf(2);
    expect(group3.childNodes).to.have.lengthOf(1);
  });


  it('should use group <default> if not provided', function() {

    // given
    const entries = [
      { id: 'save', label: 'SAVE' },
      { id: 'load', label: 'LOAD' },
      { id: 'undo', label: 'UNDO' },
      { id: 'redo', label: 'REDO' },
      { id: 'clear', label: 'CLEAR' }
    ];

    // when
    createPopupMenuList({ container, entries });

    // then
    var parent = domQuery('.results', container),
        group1 = parent.children[0];

    expect(parent.children).to.have.lengthOf(1);
    expect(group1.dataset).to.have.property('group', 'default');
    expect(group1.children).to.have.lengthOf(5);
  });


  it('should NOT allow XSS via group', function() {

    // given
    const entries = [
      { id: 'save', group: '"><marquee />' }
    ];

    // when
    createPopupMenuList({ container, entries });

    // then
    var injected = domQuery('marquee', container);

    expect(injected).not.to.exist;
  });


  it('should display group name if provided', function() {

    // given
    const entries = [
      { id: 'save', group: { name: 'file' , id: 'file' } },
      { id: 'load', group: { name: 'file' , id: 'file' } },
      { id: 'undo', group: { name: 'command' , id: 'command' } },
      { id: 'redo', group: { name: 'command' , id: 'command' } }
    ];

    // when
    createPopupMenuList({ container, entries });

    const entryHeaders = domQueryAll('.entry-header', container);

    // then
    expect(entryHeaders).to.have.lengthOf(2);
    expect(entryHeaders[0].textContent).to.eql('file');
    expect(entryHeaders[1].textContent).to.eql('command');
  });


  it('should support legacy groups (type = string)', function() {

    // given
    const entries = [
      { id: 'save', group: 'file' },
      { id: 'load', group: 'file' }
    ];

    // when
    createPopupMenuList({ container, entries });

    const entryHeaders = domQuery('[data-group="file"]', container);

    // then
    expect(entryHeaders).to.exist;
    expect(entryHeaders.children).to.have.lengthOf(2);

  });
});



// helpers
function createPopupMenuList(options) {
  const { container } = options;

  return render(
    <PopupMenuList
      entries={ [ ] }
      selectedEntry={ null }
      setSelectedEntry={ ()=>{} }
      onSelect={ ()=>{} }
      resultsRef={ null }
      { ...options }
    />,
    {
      container
    }
  );
}
